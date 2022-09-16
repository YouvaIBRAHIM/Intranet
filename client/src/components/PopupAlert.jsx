import styles from "../styles/PopupAlert.module.css";


const PopupAlert = ({onConfirm, message, typeValidate, setDisplayPopupAlert}) => {
    
    return (
        <>
            <div  className={styles.modal}>
              <div className={styles.customBox}>
                <h3>{message}</h3>
                {
                    typeValidate &&
                    <div className={styles.buttonsContainer}>
                        <button onClick={onConfirm}>Confirmer</button>
                        <button onClick={() => setDisplayPopupAlert(false)}>Annuler</button>
                    </div>
                }
                {
                    !typeValidate &&
                    <>
                        <button onClick={() => setDisplayPopupAlert(false)}>OK</button>
                    </>
                }
              </div>
          </div>
        </>
    );
};

export default PopupAlert;