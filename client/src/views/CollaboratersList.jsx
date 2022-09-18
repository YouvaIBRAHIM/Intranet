import { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getCollaboratersListFromApi } from "../services/Api.service";
import { getCollaboraters } from "../services/Collaboraters.service";
import { addAllCollaboraters, setCollaboratersToDisplay } from "../features/CollaboratersReducer";
import CollaboraterCard from "../components/CollaboraterCard";
import Search from "../components/Search";
import Loader from "../components/Loader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/CollaboratersList.module.css";

/**
 * 
 * @returns page avec la liste des collaborateurs
 */
const CollaboratersList = () => {
    const dispatch = useDispatch()
    const { collaboraters, collaboratersToDisplay } = useSelector(state => state.collaboraters)
    const enableNextResult = useRef(true);
    const topPageButton  = useRef();
    let [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const result = getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch)
        if (result) {
            setIsLoading(false)
        }
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [collaboraters, collaboratersToDisplay])


    // affiche les 10 prochains collaborateurs de la liste quand on est en bas de la page
    function onScroll () {
        
        const scrollY = Math.ceil(window.scrollY);
        const documentHeight = document.documentElement.scrollHeight;
        const innerHeight = window.innerHeight;
    
        if (scrollY >= documentHeight - innerHeight && collaboratersToDisplay && collaboraters && enableNextResult.current) {
            const collaboratersLength = collaboraters.length;
            const currentIndex = collaboratersToDisplay.length;
            let numberOfNewCollaboratersToDisplay = 0;
            if (collaboratersLength - currentIndex > 10) {
                numberOfNewCollaboratersToDisplay = 10;
            }else{
                numberOfNewCollaboratersToDisplay = collaboratersLength - currentIndex;
            }
            const slicedCollaboraters = collaboraters.slice(currentIndex, currentIndex + numberOfNewCollaboratersToDisplay);
            dispatch(setCollaboratersToDisplay({collaboratersToDisplay: slicedCollaboraters}))

        }
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topPageButton.current.style.display = "block";
        } else {
            topPageButton.current.style.display = "none";
        }
    }

    /**
     * fait remonter en haut de la page
     */
    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
        <Search enableNextResult={enableNextResult} />
        {
            !isLoading &&
            <Loader/>
        }
        <div className={styles.collaboratersListContainer}>
            {
                collaboratersToDisplay &&
                collaboratersToDisplay.map(collaborater => <CollaboraterCard key={collaborater.id} user={collaborater}/>)
            }
        </div>
        <button ref={topPageButton} onClick={scrollToTop} className={styles.topPageButton} title="Go to top">
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
        </>
    );
};

export default CollaboratersList;