import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { disconnect } from "../services/Disconnect.service";
import styles from "../styles/Banner.module.css";
import logoImage from "../assets/logo.png";
import { getFromSessionStorage } from "../services/SessionStorage.service";
import { parseJwt } from "../services/Utils.service";
import { useDispatch } from 'react-redux';
import { displayTenFirstCollaboraters } from '../reducers/CollaboratersReducer';

/**
 * @returns la barre de navigation du site
 */
function Banner({ setIsConnected }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getFromSessionStorage("token");
  const user = parseJwt(token);

  const onDisconnect = () => {
    setIsConnected(false)
    disconnect(navigate)
  }
  return (
    <header>
      <Link to="/home" className={styles.logo}>
        <img src={logoImage} alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink className={({ isActive }) => isActive ? styles.isActive : ""} to='/home'>
              <span className={styles.materialIconsOutlined}> Accueil </span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => dispatch(displayTenFirstCollaboraters())} className={({ isActive }) => isActive ? styles.isActive : ""} to="/collaboraters">
              <span className={styles.materialIconsOutlined}> Liste </span>
            </NavLink>
          </li>
          <li>
            <img src={user?.photo} alt="photo de profile" className={styles.profile} />
            <ul>
              <li className={styles.subItem}>
                <Link to="/profile">
                  <span className={styles.materialIconsOutlined}> Mon compte </span>
                </Link>              
              </li>
              {
                user?.isAdmin &&
                <li className={styles.subItem}>
                  <Link to="/collaboraters/new">
                    <span className={styles.materialIconsOutlined}> Ajouter un collaborateur </span>
                  </Link>              
                </li>
              }
              <li className={styles.subItem}>
                <span onClick={onDisconnect} className={`${styles.materialIconsOutlined} ${styles.disconnectBtn}`}> Déconnexion </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}


export default Banner;
