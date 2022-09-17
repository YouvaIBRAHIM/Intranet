import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCollaboraterFromApi } from "../services/Api.service";
import { getFromSessionStorage } from '../services/SessionStorage.service';
import { disconnect } from "../services/Disconnect.service";


export default function IndexPageRoute({ setIsConnected }) {
    const navigate = useNavigate();

    const token = getFromSessionStorage('token');
    useEffect(()=>{
        const response = getRandomCollaboraterFromApi(token);
        response.then((res) => {
            if (res.status == 200) {
                setIsConnected(true);
                navigate("/home");
            }else{
                setIsConnected(false);
                disconnect(navigate);
            }
        })
        .catch(err => {
            setIsConnected(false);
            disconnect(navigate);
        }) 
    }, [])
}