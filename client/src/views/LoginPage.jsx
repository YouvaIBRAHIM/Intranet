import React, {useState} from 'react';
import styles from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserInfo } from "../reducers/UserReducer";
import { onLogin } from "../services/Api.service";
import { setToSessionStorage } from "../services/SessionStorage.service";


const LoginPage = ({ setIsConnected }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onHandleChange = (event, setState) =>{
        const value = event.target.value;
        setState(value);
    }
    
    function onHandleSubmit(){
        if (email.trim() !== "" && password.trim() !== "" ) {
            const identifiers = {
                email: email,
                password: password
            }
            const response = onLogin(identifiers)
            response.then((res) => {
                if (res.status == 200) {
                    const user = res.data.user;
                    const token = res.data.token;
                    dispatch(setUserInfo({ user : user }));
                    setToSessionStorage('token', JSON.stringify(token));
                    setIsConnected(true);
                    navigate("/home");
                }else{
                    setErrorMessage(res.data.error)
                }
            })
            .catch(err => {
                setErrorMessage(err.message);
            }) 

        }else{
            setErrorMessage("Un ou plusieurs champs sont vides");
        }
    }

    return (
        <div className={styles.container}>
            <h1>Bienvenue dans l'intranet de l'École Multimédia</h1>
            <div className={styles.formContainer}>
                <h2>Login</h2>
                <span className={styles.errorMessage}>{errorMessage}</span>
                <div className={styles.wrapper}>
                    <input onChange={(event) => onHandleChange(event, setEmail)} name='email' id='email' className={styles.input} placeholder="Email" type="email" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.wrapper}>
                    <input onChange={(event) => onHandleChange(event, setPassword)} className={styles.input} name='password' id='password'placeholder="Mot de passe" type="password" required/>
                    <span className={styles.underline}></span>
                </div>
                <div className={styles.loginBtnContainer}>
                    <button onClick={onHandleSubmit}>Se connecter</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;