import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllCollaboraters, updateCollaboratersListInGlobalState } from "../reducers/CollaboratersReducer";
import { setUserInfo } from "../reducers/UserReducer";
import { getCollaboratersListFromApi } from "../services/Api.service";
import { getCollaboraters } from "../services/Collaboraters.service";
import { getFromSessionStorage, setToSessionStorage } from "../services/SessionStorage.service";
import { setPhoneNumberFormat, emailVerification } from "../services/Utils.service";
import styles from "../styles/UserForm.module.css";
import PopupAlert from "./PopupAlert"

const UserForm = ({user, actionOnSubmit, isConnectedUserProfile}) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    const { collaboraters } = useSelector(state => state.collaboraters);
    getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch)

    const userInfosStructure = {
                                    "gender": "male",
                                    "firstname": "",
                                    "lastname": "",
                                    "password": "",
                                    "email": "",
                                    "phone": "",
                                    "birthdate": "",
                                    "city": "",
                                    "country": "",
                                    "photo": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                                    "service": "Client"
                                }

    const [userInfos, setUserInfos] = useState(user ? {...user, password: ""} : userInfosStructure)
    const [passwordVerificationField, setPasswordVerificationField] = useState("")
    const [displayPopupAlert, setDisplayPopupAlert]= useState(false)
    const [payload, setPayload]= useState({})

    const onSaveBtn = () => {
        const token = getFromSessionStorage("token");
        
        if (userInfos.firstname.trim() == "") {
            setPayload({
                type: "Attention",
                message: `Le prénom n'a pas été saisi`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }

        if (userInfos.lastname.trim() == "") {
            setPayload({
                type: "Attention",
                message: `Le nom de famille n'a pas été saisi`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }

        const isEmailAlreadExist = emailVerification(userInfos.email, user, collaboraters)
        if (isEmailAlreadExist >= 0) {
            setPayload({
                type: "Attention",
                message: `L'email saisi appartient déjà à un autre utilisateur`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }
        
        if (!user && userInfos.password.trim() == "") {
            setPayload({
                type: "Attention",
                message: `Vous devez saisir un mot de passe pour un nouveau collaborateur`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }
        if (userInfos.password.trim() != "") {
            if (userInfos.password.trim() !== passwordVerificationField.trim()) {
                setPayload({
                    type: "Attention",
                    message: `Les mots de passe saisis ne sont pas identiques`,
                    typeValidate: false,
                })
                setDisplayPopupAlert(true)
                return
            }
        }
        
        if (userInfos.phone.replaceAll('-', '').length < 10) {
            setPayload({
                type: "Attention",
                message: `Le champ correspondant au numéro de téléphone est vide ou mal renseigné. Il doit être au format suivant : 00 00 00 00 00`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }

        if (userInfos.birthdate.trim() == "") {
            setPayload({
                type: "Attention",
                message: `La date de naissance n'a pas été saisie`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }

        if (userInfos.city.trim() == "") {
            setPayload({
                type: "Attention",
                message: `La ville n'a pas été saisie`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }

        if (userInfos.country.trim() == "") {
            setPayload({
                type: "Attention",
                message: `Le pays n'a pas été saisie`,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
            return
        }

        // Si aucune photo n'est fournie, on met par défaut l'image ci-dessous
        const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

        const checkedUserIfos = {...userInfos, photo : userInfos.photo.trim() === "" ? defaultProfileImage : userInfos.photo}
        const result = actionOnSubmit(token, checkedUserIfos, user?.id)
        result.then(res => {
            if (res.status == 201) {
                dispatch(updateCollaboratersListInGlobalState({user : checkedUserIfos, userId : res.data.collaborateur.id}))
                setPayload({
                    type: "Info",
                    message: res.data.success,
                    typeValidate: false,
                })
                setDisplayPopupAlert(true)
                if (isConnectedUserProfile) {
                    dispatch(setUserInfo({ user : checkedUserIfos }));
                    setToSessionStorage('user', JSON.stringify(checkedUserIfos));
                }
            }else{
                setPayload({
                    type: "Erreur",
                    message: res,
                    typeValidate: false,
                })
                setDisplayPopupAlert(true)
            }
        })
        .catch(err => {
            setPayload({
                type: "Erreur",
                message: err.message,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
        })
    }

    return (
        <div className={styles.container}>
            {
                displayPopupAlert &&
                <PopupAlert type={payload.type} typeValidate={payload.typeValidate} message={payload.message} setDisplayPopupAlert={setDisplayPopupAlert}/>
            }
            <div className={styles.formContainer}>
                {
                    userState.user.isAdmin && 
                    <div className={styles.wrapper}>
                        <div className={styles.btnContainer}>
                            <h4>Role</h4>
                            <label className={`${styles.switch} ${styles.btnColorModeSwitch}`}>
                                <input onInput={(event) => setUserInfos({...userInfos, isAdmin: event.target.checked})} type="checkbox" name="role" id="role" defaultChecked={user ? user?.isAdmin : false}/>
                                <label htmlFor="role" data-on="Admin" data-off="Utilisateur" className={styles.btnColorModeSwitchInner}></label>
                            </label>
                        </div>
                    </div>
                }
                <div className={styles.wrapper}>
                    <div className={styles.gender}>
                        <h4 className={styles.title}>Genre</h4>
                        <div className={styles.genderSelect} tabIndex="1">
                            <input onInput={(event) => setUserInfos({...userInfos, gender: event.target.id})} className={styles.selectopt} name="gender" type="radio" id="male" defaultChecked={user ? (user?.gender === "male" ? true : true): false}/>
                            <label htmlFor="male" className={styles.genderOption}>Homme</label>

                            <input onInput={(event) => setUserInfos({...userInfos, gender: event.target.id})} className={styles.selectopt} name="gender" type="radio" id="female" defaultChecked={user ? (user?.gender === "female" ? true : false): false}/>
                            <label htmlFor="female" className={styles.genderOption}>Femme</label>

                            
                        </div>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, firstname: event.target.value})} name='firstname' className={styles.input} placeholder="Prénom" type="text" required defaultValue={user?.firstname}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, lastname: event.target.value})} name='lastname' className={styles.input} placeholder="Nom" type="text" required defaultValue={user?.lastname}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, email: event.target.value})} name='email' className={styles.input} placeholder="Email" type="email" required  defaultValue={user?.email}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, password: event.target.value})} name='password' className={styles.input} placeholder="Mot de passe" type="password" />
                    <span className={styles.underline}></span>
                </div>

                <div className={styles.wrapper}>
                    <input onInput={(event) => setPasswordVerificationField(event.target.value)} name='password2' className={styles.input} placeholder="Confirmez le mot de passe" type="password" />
                    <span className={styles.underline}></span>
                </div>

                <div className={styles.wrapper}>
                    <input onInput={(event) => setPhoneNumberFormat(event, userInfos, setUserInfos)} name='phone' className={styles.input} placeholder="Numéro de téléphone" type="tel" required defaultValue={user?.phone.replaceAll("-", " ")} maxLength={14}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, birthdate: event.target.value})} name='birthdate' className={styles.input} placeholder="Date de naissance" type="date" required  defaultValue={user?.birthdate}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, city: event.target.value})} name='city' className={styles.input} placeholder="Ville" type="text" required  defaultValue={user?.city}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, country: event.target.value})} name='country' className={styles.input} placeholder="Pays" type="text" required  defaultValue={user?.country}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onInput={(event) => setUserInfos({...userInfos, photo: event.target.value})} name='photo' className={styles.input} placeholder="Photo (facultative)" type="text" required  defaultValue={user?.photo}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.service}>
                        <h4 className={styles.title}>Service</h4>
                        <div className={styles.select} tabIndex="1">
                            <input onInput={(event) => setUserInfos({...userInfos, service: "Client"})} className={styles.selectopt} name="service" type="radio" id="Client" defaultChecked={user ? (user?.service === "Client" ? true : false): true} />
                            <label htmlFor="Client" className={styles.option}>Client</label>

                            <input onInput={(event) => setUserInfos({...userInfos, service: "Marketing"})} className={styles.selectopt} name="service" type="radio" id="Marketing" defaultChecked={user ? (user?.service === "Marketing" ? true : false): false}/>
                            <label htmlFor="Marketing" className={styles.option}>Marketing</label>

                            <input onInput={(event) => setUserInfos({...userInfos, service: "Technique"})} className={styles.selectopt} name="service" type="radio" id="Technique" defaultChecked={user ? (user?.service === "Technique" ? true : false): false}/>
                            <label htmlFor="Technique" className={styles.option}>Technique</label>
                        </div>
                    </div>
                </div>

                <div className={styles.saveBtnContainer}>
                    <button onClick={onSaveBtn}>Enregistrer</button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;