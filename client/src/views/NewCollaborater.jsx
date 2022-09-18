import styles from "../styles/Collaborater.module.css";
import { addeUser } from "../services/Api.service";
import UserForm from "../components/UserForm";

/**
 * @returns la page pour ajouter un nouveau collaborateur
 */
const NewCollaborater = () => {

    return (
        <div className={styles.collaboraterContainer}>
            <h2>Ajouter un nouveau collaborateur</h2>
            <UserForm isConnectedUserProfile={false} actionOnSubmit={addeUser}/>
        </div>
    );
};

export default NewCollaborater;