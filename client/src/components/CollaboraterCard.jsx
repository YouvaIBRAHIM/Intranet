import styles from "../styles/CollaboraterCard.module.css";
import moment from "moment";
import 'moment/dist/locale/fr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faEnvelope, faPhone, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";

const CollaboraterCard = ({user}) => {
    const userState = useSelector(state => state.user);
    const age = moment().diff(user.birthdate, 'years');
    const numberPhone = user.phone.replaceAll("-", " ");
    const birthdate = moment(user.birthdate).locale('fr').format('Do MMMM YYYY');

    return (
        <div className={styles.collaboraterCardContainer}>
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
                        <button className={styles.edit}>Éditer</button>
                        <button className={styles.delete}>Supprimer</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default CollaboraterCard;