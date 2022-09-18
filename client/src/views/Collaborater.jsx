import styles from "../styles/Collaborater.module.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCollaboratersListFromApi, updateUser } from "../services/Api.service";
import { addAllCollaboraters } from "../features/CollaboratersReducer";
import { getCollaboraters } from "../services/Collaboraters.service";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

/**
 * 
 * @returns le page correspondant à aux informations du collaborateur selectioné
 */
const Collaborater = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { collaboraters } = useSelector(state => state.collaboraters)
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    // si l'id du collaborateur correspond à celui de l''utilisateur connecté, alors on sera redirigé vers la page de profil
    if (id == user.id) {
        navigate("/profile");
    }
    const [collaborater, setCollaborater] = useState(null)

    // récupère les informations du collaborateur pour les injecter dans le formulaire de modification
    useEffect(() => {
        getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch)

        if (collaboraters) {
            setCollaborater(collaboraters.find(collaborater => collaborater.id == id))
        }
    }, [collaboraters])

    return (
        <div className={styles.collaboraterContainer}>
            {
                collaborater &&
                <>
                    <h2>Modifier les informations de {collaborater.firstname} {collaborater.lastname}</h2>
                    <UserForm isConnectedUserProfile={false} user={collaborater} actionOnSubmit={updateUser}/>
                </>
            }
            {
                !collaborater &&
                <h2>Aucun collaborateur trouvé</h2>
            }
        </div>
    );
};

export default Collaborater;