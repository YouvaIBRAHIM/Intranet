import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCollaborater } from "../services/Api.service";
import { getFromSessionStorage } from '../services/SessionStorage.service';

export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(false);

    const token = getFromSessionStorage('token');
    useEffect(()=>{
        const response = getRandomCollaborater(token);
        response.then((res) => {
            if (res.status == 200) {
                setIsTokenValid(true)
            }else{
                navigate("/");
            }
        })
        .catch(err => {
            navigate("/");;
        }) 

    }, [])

    if (isTokenValid) {
        return children;
    }
}