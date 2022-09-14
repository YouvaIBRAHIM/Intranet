import { useState } from "react";
import styles from "../styles/Search.module.css";

const Search = () => {
    const [ typeFilter, setTypeFilter ] = useState('name')
    const [ serviceFilter, setServiceFilter ] = useState('noFilter')

    const onHandleTypeFilter = (event) => {
        if (event.target.type === "radio") {
            setTypeFilter(event.target.id)
        }
    }
    const onHandleServiceFilter = (event) => {
        if (event.target.type === "radio") {
            console.log(event.target.id);
            setServiceFilter(event.target.id)
        }
    }
    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <input type="search" placeholder="Rechercher"/>
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