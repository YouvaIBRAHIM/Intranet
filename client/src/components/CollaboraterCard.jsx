import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../styles/CollaboraterCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faEnvelope, faPhone, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import 'moment/dist/locale/fr';
import { Link } from "react-router-dom";
import { deleteUser } from "../services/Api.service";
import PopupAlert from "./PopupAlert";
import { deleteCollaboraterInGlobalState } from "../features/CollaboratersReducer";

/**
 * @param {Object} user contient les informations sur un collaborateur
 * @returns le composant correspondant à la card d'un collaborateur
 */
const CollaboraterCard = ({user}) => {
    const [displayPopupAlert, setDisplayPopupAlert]= useState(false)
    const [payload, setPayload]= useState({})
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch()

    // calcul de l'age du collaborateur
    const age = moment().diff(user.birthdate, 'years');
    // formatage du numéro de téléphone
    const numberPhone = user.phone.replaceAll("-", " ");
    // formatage de la date de naissance
    const birthdate = moment(user.birthdate).locale('fr').format('Do MMMM YYYY');

    // affiche une popup pour confirmer la suppression du collaborateur
    const onDeleteBtn = () => {
        setPayload({
            type: "Attention",
            message: `Voulez-vous vraiment supprimer ${user.firstname} ${user.lastname} des collaborateurs ?`,
            typeValidate: true,
        })
        setDisplayPopupAlert(true)
    }

    // supprime le collaborateur après confirmation
    const deleteCollaborater = (id) => {
        setDisplayPopupAlert(false)
        const result = deleteUser(id)
        result.then(res => {
            if (res.status === 200) {
                dispatch(deleteCollaboraterInGlobalState({userId: id}))
            }else{
                setPayload({
                    message: res,
                    typeValidate: false,
                    type: "Erreur"

                })
                setDisplayPopupAlert(true)
            }
        })
        .catch(err => {
            setPayload({
                message: err.message,
                typeValidate: false,
                type: "Erreur"
            })
            setDisplayPopupAlert(true)
        })
    }

    return (
        <div className={styles.collaboraterCardContainer}>
            {
                displayPopupAlert &&
                <PopupAlert type={payload.type} typeValidate={payload.typeValidate} message={payload.message} onConfirm={()=> {deleteCollaborater(user.id)}} setDisplayPopupAlert={setDisplayPopupAlert}/>
            }
            <div style={{backgroundImage: `url(${user.photo})`}} className={`${styles.collaboraterCardImg}`}></div>

            <div className={styles.cardBody}>
                <div className={styles.topCardBody}>
                    <h5 className={styles.service}>{user.service}</h5>
                </div>
                <div className={styles.mainInfos}>
                    <h2 className={styles.fullname}>{`${user.firstname} ${user.lastname}`}</h2>
                    <span className={styles.age}>({age} ans)</span>
                </div>
                
                <div className={styles.locationInfos}>
                    <span className={styles.location}><FontAwesomeIcon className={styles.icon} icon={faLocationPin} />  {user.city}, {user.country}</span>
                </div>

                <div className={styles.contactInfos}>
                    <a href={`mailto:${user.email}`} className={styles.email}><FontAwesomeIcon className={styles.icon} icon={faEnvelope} />   {user.email}</a>
                    <a href={`tel:${numberPhone}`} className={styles.phone}><FontAwesomeIcon className={styles.icon} icon={faPhone} />  {numberPhone}</a>
                </div>

                <div className={styles.birthdate}>
                    <span><FontAwesomeIcon className={styles.icon} icon={faBirthdayCake} />Date de naissance : <b>{birthdate}</b></span>
                </div>
                {
                    userState?.user.isAdmin &&
                    <div className={styles.actionButtons}>
                        <Link to={`/collaboraters/${user.id}`} className={styles.edit}>Éditer</Link>
                        <button onClick={onDeleteBtn} className={styles.delete}>Supprimer</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default CollaboraterCard;