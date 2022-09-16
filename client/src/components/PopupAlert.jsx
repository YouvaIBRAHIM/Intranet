import styles from "../styles/PopupAlert.module.css";


const PopupAlert = ({onConfirm, message, typeValidate, setDisplayPopupAlert}) => {
    
    return (
        <>
            <div className={styles.modal}>
              <div className={styles.customBox}>
                <p>{message}</p>
                {
                    typeValidate &&
                    <>
                        <button onClick={onConfirm}>Confirmer</button>
                        <button onClick={() => setDisplayPopupAlert(false)}>Annuler</button>
                    </>
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