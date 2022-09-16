import styles from "../styles/Collaborater.module.css";
import { updateUser } from "../services/Api.service";
import UserForm from "../components/UserForm";
import { getFromSessionStorage } from "../services/SessionStorage.service";
import { parseJwt } from "../services/Utils.service";

const Profile = () => {
    const token = getFromSessionStorage("token");
    const user = parseJwt(token);
    delete user?.iat;
    return (
        <div className={styles.collaboraterContainer}>
            <h2>Modifier mon profile</h2>
            <UserForm user={user} actionOnSubmit={updateUser}/>
        </div>
    );
};

export default Profile;