import { useState } from "react";
import { getFromSessionStorage } from "../services/SessionStorage.service";
import styles from "../styles/UserForm.module.css";


const UserForm = ({user, actionOnSubmit}) => {
    const userInfosStructure = {
                                    "gender": "male",
                                    "firstname": "",
                                    "lastname": "",
                                    "password": "",
                                    "email": "",
                                    "phone": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                                    "birthdate": "",
                                    "city": "",
                                    "country": "",
                                    "photo": "",
                                    "service": "Client"
                                }

    const [userInfos, setUserInfos] = useState(user ? {...user, password: ""} : {...userInfosStructure})
    const [apiResponseMessage, setApiResponseMessage] = useState("")
    const [detetedError, setDetectedError] = useState(false)


    const onSaveBtn = () => {
        const token = getFromSessionStorage("token");
        const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

        const result = actionOnSubmit(token, {...userInfos, photo : userInfos.photo === "" ? defaultProfileImage : userInfos.photo}, user?.id)
        result.then(res => {
            if (res.status == 201) {
                setDetectedError(false)
                setApiResponseMessage(res.data.success)
            }else{
                setDetectedError(true)
                setApiResponseMessage(res)
            }
        })
        .catch(err => {
            setDetectedError(true)
            setApiResponseMessage(err.message)
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.wrapper}>
                    <div className={styles.gender}>
                        <h4 className={styles.title}>Genre</h4>
                        <div className={styles.select} tabIndex="1">
                            <input onChange={(event) => setUserInfos({...userInfos, gender: "male"})} className={styles.selectopt} name="gender" type="radio" id="male" defaultChecked={user ? (user?.gender === "male" ? true : true): false}/>
                            <label htmlFor="male" className={styles.option}>Homme</label>

                            <input onChange={(event) => setUserInfos({...userInfos, gender: "female"})} className={styles.selectopt} name="gender" type="radio" id="female" defaultChecked={user ? (user?.gender === "female" ? true : false): false}/>
                            <label htmlFor="female" className={styles.option}>Femme</label>
                        </div>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, firstname: event.target.value})} name='firstname' className={styles.input} placeholder="Prénom" type="text" required defaultValue={user?.firstname}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, lastname: event.target.value})} name='lastname' className={styles.input} placeholder="Nom" type="text" required defaultValue={user?.lastname}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, email: event.target.value})} name='email' className={styles.input} placeholder="Email" type="email" required  defaultValue={user?.email}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, password: event.target.value})} name='password' className={styles.input} placeholder="Mot de passe" type="password" />
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, phone: event.target.value.replaceAll(" ", "-")})} name='phone' className={styles.input} placeholder="Téléphone" type="tel" required defaultValue={user?.phone.replaceAll("-", " ")}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, birthdate: event.target.value})} name='birthdate' className={styles.input} placeholder="Date de naissance" type="date" required  defaultValue={user?.birthdate}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, city: event.target.value})} name='city' className={styles.input} placeholder="Ville" type="text" required  defaultValue={user?.city}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, country: event.target.value})} name='country' className={styles.input} placeholder="Pays" type="text" required  defaultValue={user?.country}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => setUserInfos({...userInfos, photo: event.target.value})} name='photo' className={styles.input} placeholder="Photo" type="text" required  defaultValue={user?.photo}/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.service}>
                        <h4 className={styles.title}>Service</h4>
                        <div className={styles.select} tabIndex="1">
                            <input onChange={(event) => setUserInfos({...userInfos, service: "Client"})} className={styles.selectopt} name="service" type="radio" id="Client" defaultChecked={user ? (user?.service === "Client" ? true : false): true} />
                            <label htmlFor="Client" className={styles.option}>Client</label>

                            <input onChange={(event) => setUserInfos({...userInfos, service: "Marketing"})} className={styles.selectopt} name="service" type="radio" id="Marketing" defaultChecked={user ? (user?.service === "Marketing" ? true : false): false}/>
                            <label htmlFor="Marketing" className={styles.option}>Marketing</label>

                            <input onChange={(event) => setUserInfos({...userInfos, service: "Technique"})} className={styles.selectopt} name="service" type="radio" id="Technique" defaultChecked={user ? (user?.service === "Technique" ? true : false): false}/>
                            <label htmlFor="Technique" className={styles.option}>Technique</label>
                        </div>
                    </div>
                </div>
                <h3 className={detetedError ? styles.error : styles.success}>{apiResponseMessage}</h3>
                <div className={styles.saveBtnContainer}>
                    <button onClick={onSaveBtn}>Enregistrer</button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;