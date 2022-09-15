import styles from "../styles/Collaborater.module.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getCollaboratersListFromApi } from "../services/Api.service";
import { addAllCollaboraters } from "../reducers/CollaboratersReducer";
import { getCollaboraters } from "../services/Collaboraters.service";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

const Collaborater = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { collaboraters } = useSelector(state => state.collaboraters)
    const [collaborater, setCollaborater] = useState(null)

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
                    <UserForm />
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