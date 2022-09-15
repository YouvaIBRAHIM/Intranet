import styles from "../styles/UserForm.module.css";


const UserForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.wrapper}>
                <div className={styles.serviceFilter}>
                    <h5>Catégorie</h5>
                    <div className={styles.select} tabIndex="1">
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
                <div className={styles.wrapper}>
                    <input name='firstname' className={styles.input} placeholder="Prénom" type="text" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='lastname' className={styles.input} placeholder="Nom" type="text" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='email' className={styles.input} placeholder="Email" type="email" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='password' className={styles.input} placeholder="Mot de passe" type="password" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='phone' className={styles.input} placeholder="Téléphone" type="tel" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='birthdate' className={styles.input} placeholder="Date de naissance" type="date" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='city' className={styles.input} placeholder="Ville" type="text" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='country' className={styles.input} placeholder="Pays" type="text" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input name='photo' className={styles.input} placeholder="Photo" type="text" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.saveBtnContainer}>
                    <button>Enregistrer</button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;