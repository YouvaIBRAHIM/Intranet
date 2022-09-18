import styles from "../styles/Collaborater.module.css";
import { updateUser } from "../services/Api.service";
import UserForm from "../components/UserForm";
import { useSelector } from "react-redux";

/**
 * 
 * @returns La page de l'utilisateur connecté
 */
const Profile = () => {
    const { user } = useSelector(state => state.user)

    return (
        <div className={styles.collaboraterContainer}>
            <h2>Modifier mon profile</h2>
            <UserForm isConnectedUserProfile={true} user={user} actionOnSubmit={updateUser}/>
        </div>
    );
};

export default Profile;