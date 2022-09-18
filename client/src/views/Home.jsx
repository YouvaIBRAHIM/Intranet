import { useState, useEffect } from "react";
import { getRandomCollaboraterFromApi } from "../services/Api.service";
import CollaboraterCard from "../components/CollaboraterCard";
import { useSelector } from "react-redux";
import { getRandomCollaborater } from "../services/Collaboraters.service";
import styles from "../styles/Home.module.css";

/**
 * @returns la page affichant un collaborateur au hasard
 */
const Home = () => {
    const [randomCollaborater, setRandomCollaborater] = useState(null);
    const { user } = useSelector(state => state.user)

    useEffect(()=>{
        getRandomCollaborater(getRandomCollaboraterFromApi, setRandomCollaborater)

    }, [])
    return (
        <div>
            
            {
                randomCollaborater &&
                <div className={styles.homeContainer}>
                    <h1>Bienvenue {user.firstname}</h1>
                    <CollaboraterCard user={randomCollaborater}/>
                    <button onClick={() => getRandomCollaborater(getRandomCollaboraterFromApi, setRandomCollaborater)} className={styles.randomCollaboraterButton}>
                        Dire bonjour à quelqu'un d'autre
                    </button>
                </div>
            }
        </div>
    );
};

export default Home;