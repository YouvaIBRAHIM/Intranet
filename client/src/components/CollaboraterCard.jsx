import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../styles/CollaboraterCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faEnvelope, faPhone, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import 'moment/dist/locale/fr';
import { Link } from "react-router-dom";
import { deleteUser } from "../services/Api.service";
import { getFromSessionStorage } from "../services/SessionStorage.service";
import PopupAlert from "./PopupAlert";
import { deleteCollaboraterInGlobalState } from "../reducers/CollaboratersReducer";

const CollaboraterCard = ({user}) => {
    const [displayPopupAlert, setDisplayPopupAlert]= useState(false)
    const [payload, setPayload]= useState({})
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch()

    const age = moment().diff(user.birthdate, 'years');
    const numberPhone = user.phone.replaceAll("-", " ");
    const birthdate = moment(user.birthdate).locale('fr').format('Do MMMM YYYY');
    const token = getFromSessionStorage("token");

    const onDeleteBtn = () => {
        setPayload({
            message: `Voulez-vous vraiment supprimer ${user.firstname} ${user.lastname} des collaborateurs ?`,
            typeValidate: true,
        })
        setDisplayPopupAlert(true)
    }

    const deleteCollaborater = (token, id) => {
        setDisplayPopupAlert(false)
        const result = deleteUser(token, id)
        result.then(res => {
            if (res.status === 200) {
                dispatch(deleteCollaboraterInGlobalState({userId: id}))
            }
        })
        .catch(err => {
            setPayload({
                message: err.message,
                typeValidate: false,
            })
            setDisplayPopupAlert(true)
        })
    }
    return (
        <div className={styles.collaboraterCardContainer}>
            {
                displayPopupAlert &&
                <PopupAlert typeValidate={payload.typeValidate} message={payload.message} onConfirm={()=> {deleteCollaborater(token, user.id)}} setDisplayPopupAlert={setDisplayPopupAlert}/>
            }
            <img src={user.photo} className={`${styles.collaboraterCardImg}`} alt={`${user.firstname} ${user.lastname}`}/>
            
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
                    <span><FontAwesomeIcon className={styles.icon} icon={faBirthdayCake} />  Date d'anniversaire : <b>{birthdate}</b></span>
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