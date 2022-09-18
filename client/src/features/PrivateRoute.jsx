import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCollaboraterFromApi } from "../services/Api.service";
import { disconnect } from "../services/Disconnect.service";

export default function PrivateRoute({ children, setIsConnected }) {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);

    useEffect(()=>{
        const response = getRandomCollaboraterFromApi();
        response.then((res) => {
            if (res.status == 200) {
                setIsConnected(true);
                setIsTokenValid(true)
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

    if (isTokenValid) {
        return children;
    }
}