import { useRef, useState } from "react";
import styles from "../styles/Search.module.css";
import {useSelector, useDispatch} from "react-redux";
import { filterCollaboratersToDisplay, displayTenFirstCollaboraters } from "../reducers/CollaboratersReducer";

const Search = ({enableNextResult}) => {
    const { collaboraters, collaboratersToDisplay } = useSelector(state => state.collaboraters)
    const searchValue = useRef('')
    const typeFilter = useRef('name')
    const serviceFilter = useRef('noFilter')

    const dispatch = useDispatch();

    const onHandleTypeFilter = (event) => {
        if (event.target.type === "radio") {
            typeFilter.current = event.target.id
            filter();
        }
    }
    const onHandleServiceFilter = (event) => {
        if (event.target.type === "radio") {
            serviceFilter.current = event.target.id
            filter();
        }
    }

    const getTypeFieldToFilter = (collaborater) => {
        switch (typeFilter.current) {
            case 'name':
                return `${collaborater.firstname} ${collaborater.lastname}`.toLowerCase();
            case 'location':
                return `${collaborater.city} ${collaborater.country}`.toLowerCase();
            default:
                return `${collaborater.firstname} ${collaborater.lastname}`.toLowerCase();
        }
    }
    const onSearch = (event) => {
        searchValue.current = event.target.value;
        // si le contenu de la recherche est vide, on affiche les premiers 10 collaborateurs
        if (searchValue.current.trim() == "") {
            enableNextResult.current = true;
            return dispatch(displayTenFirstCollaboraters())
        }
        filter();
    }

    const filter = () => {
        const filtredCollaborater =  collaboraters.filter((collaborater) => {
            const fieldToFilter = getTypeFieldToFilter(collaborater);
            let isMatch = false;
            if (serviceFilter.current !== "noFilter") {
                if (fieldToFilter.includes(searchValue.current.trim().toLowerCase()) && collaborater.service.toLowerCase() === serviceFilter.current) {
                    isMatch = true;
                }
            }else{
                isMatch = fieldToFilter.includes(searchValue.current.trim().toLowerCase());
            }
            return isMatch;
        });
        enableNextResult.current = false;
        dispatch(filterCollaboratersToDisplay({collaboratersToDisplay: filtredCollaborater}))
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <input onChange={onSearch} type="search" placeholder="Rechercher"/>
            </div>
            <div className={styles.filterContainer}>
                <div className={styles.typeFilter}>
                    <h5>Rechercher par</h5>
                    <div onChange={onHandleTypeFilter} className={styles.select} tabIndex="1">
                        <input className={styles.selectopt} name="typeFilter" type="radio" id="name" defaultChecked/>
                        <label htmlFor="name" className={styles.option}>Nom</label>

                        <input className={styles.selectopt} name="typeFilter" type="radio" id="location"/>
                        <label htmlFor="location" className={styles.option}>Localisation</label>
                    </div>
                </div>
                <div className={styles.serviceFilter}>
                    <h5>Catégorie</h5>
                    <div onChange={onHandleServiceFilter} className={styles.select} tabIndex="1">
                        <input className={styles.selectopt} name="serviceFilter" type="radio" id="noFilter" defaultChecked/>
                        <label htmlFor="noFilter" className={styles.option}>-- Aucune --</label>

                        <input className={styles.selectopt} name="serviceFilter" type="radio" id="client" />
                        <label htmlFor="client" className={styles.option}>Client</label>

                        <input className={styles.selectopt} name="serviceFilter" type="radio" id="technique"/>
                        <label htmlFor="technique" className={styles.option}>Technique</label>

                        <input className={styles.selectopt} name="serviceFilter" type="radio" id="marketing"/>
                        <label htmlFor="marketing" className={styles.option}>Marketing</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;