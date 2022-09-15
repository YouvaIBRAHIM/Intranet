import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { disconnect } from "../services/Disconnect.service";
import styles from "../styles/Banner.module.css";
import logoImage from "../assets/logo.png";
import { getFromSessionStorage } from "../services/SessionStorage.service";
import { parseJwt } from "../services/Utils.service";

/**
 * @returns la barre de navigation du site
 */
function Banner({ setIsConnected }) {
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
            <Link to="/home">
              <span className={styles.materialIconsOutlined}> Accueil </span>
            </Link>
          </li>
          <li>
            <Link to="/collaboraters">
              <span className={styles.materialIconsOutlined}> Liste </span>
            </Link>
          </li>
          {
            user?.isAdmin &&
            <li>
              <Link to="/collaboraters/new">
                <span className={styles.materialIconsOutlined}> Ajouter </span>
              </Link>
            </li>
          }
          <li>
            <img src={user?.photo} alt="photo de profile" className={styles.profile} />
            <ul>
              <li className={styles.subItem}>
                <Link to="/list">
                  <span className={styles.materialIconsOutlined}> Mon compte </span>
                </Link>              </li>
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
