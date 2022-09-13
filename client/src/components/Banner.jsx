import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from "../styles/Banner.module.css";

/**
 * affiche le nombre de pokemons stockés dans le pokedex
 * @returns la barre de navigation du site
 */
function Banner() {



  return (
    <header>
      <div className={styles.mainTitle}>
        <Link to="/">Intranet</Link>
      </div>

      <div style={{ display: 'flex' }}>
        <div className={styles.menuItem}>
          <Link to="/pokedex">

          </Link>
        </div>
      </div>
    </header>
  );
}


export default Banner;
