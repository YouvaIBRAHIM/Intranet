import { useEffect, useRef } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getCollaboratersListFromApi } from "../services/Api.service";
import { getCollaboraters } from "../services/Collaboraters.service";
import { addAllCollaboraters, setCollaboratersToDisplay } from "../reducers/CollaboratersReducer";
import CollaboraterCard from "../components/CollaboraterCard";
import Search from "../components/Search";

import styles from "../styles/Main.module.css";

const CollaboratersList = () => {
    const dispatch = useDispatch()
    const { collaboraters, collaboratersToDisplay } = useSelector(state => state.collaboraters)
    const enableNextResult = useRef(true);

    useEffect(()=>{
        getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch)
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [collaboraters, collaboratersToDisplay])

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

    }

    return (
        <>
        <Search enableNextResult={enableNextResult} />
        <div className={styles.collaboratersListContainer}>
            {
                collaboratersToDisplay &&
                collaboratersToDisplay.map(collaborater => <CollaboraterCard key={collaborater.id} user={collaborater}/>)
            }
        </div>
        </>
    );
};

export default CollaboratersList;