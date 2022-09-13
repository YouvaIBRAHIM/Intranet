import styles from "../styles/Collaborater.module.css";
import moment from "moment";

const CollaboraterCard = ({user}) => {
    const age = moment().diff(user.birthdate, 'years');
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
                
                <h4 className={`${styles.cardText}`}>azeza</h4>
                <div className={`${styles.flex}`} class="flex title mt-4">
                    <h6 class="card-subtitle mb-2 text-muted">azeaze</h6>
                    <h6 class="card-subtitle mb-2 text-muted">aze</h6>
                </div>
                
            </div>
        </div>
    );
};

export default CollaboraterCard;