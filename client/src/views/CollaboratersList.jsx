import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getCollaboratersList } from "../services/Api.service";
import { getFromSessionStorage } from '../services/SessionStorage.service';
import { addAllCollaboraters, setCollaboratersToDisplay } from "../reducers/CollaboratersReducer";
import CollaboraterCard from "../components/CollaboraterCard";
import Search from "../components/Search";

import styles from "../styles/Main.module.css";

const CollaboratersList = () => {
    const dispatch = useDispatch()
    const { collaboraters, collaboratersToDisplay } = useSelector(state => state.collaboraters)

    const token = getFromSessionStorage('token');
    useEffect(()=>{
        if (!collaboraters) {
        const response = getCollaboratersList(token);
        response.then((res) => {
            if (res.status == 200) {
                    const collaboratersList = res.data;
                    dispatch(addAllCollaboraters({collaboraters: collaboratersList}))
                }
            })
        }
        
        window.addEventListener('scroll', onScroll);

        return () => {
        window.removeEventListener('scroll', onScroll);
        }
    }, [])

    function onScroll () {
        let scrollY = Math.ceil(window.scrollY);
        let documentHeight = document.documentElement.scrollHeight;
        let innerHeight = window.innerHeight;
    
        if (scrollY >= documentHeight - innerHeight) {
        //   setIsNextResultLoading(true)
        //   const result = getPokemons(next.current);
        //   result.then(res => {
            // setIsNextResultLoading(false)
            const currentIndex = 10
            console.log(collaboratersToDisplay);
            const collaboratersList = collaboraters.slice(currentIndex, 10);

            dispatch(addAllCollaboraters({setCollaboratersToDisplay: collaboratersList}))

        //   })
        }
        // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        //   topPageButton.current.style.display = "block";
        // } else {
        //   topPageButton.current.style.display = "none";
        // }
    }

    return (
        <>
        <Search />
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