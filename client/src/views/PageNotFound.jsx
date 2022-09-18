import styles from "../styles/Collaborater.module.css";


/**
 * 
 * @returns La page 404
 */
const PageNotFound = () => {

    return (
        <div className={styles.collaboraterContainer}>
            <h2>404</h2>
            <h4>Page introuvable</h4>
        </div>
    );
};

export default PageNotFound;