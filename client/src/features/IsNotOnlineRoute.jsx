import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomCollaborater } from "../services/Api.service";
import { getFromSessionStorage } from '../services/SessionStorage.service';


export default function IsNotOnlineRoute({children}) {
    const navigate = useNavigate();
    let [isNotConnected, setIsNotConnected] = useState(false);
    const token = getFromSessionStorage('token');

    useEffect(()=>{
        if (token) {
            const response = getRandomCollaborater(token);
            response.then((res) => {
                if (res.status == 200) {
                    navigate("/home");
                }else{
                    setIsNotConnected(true);
                }
            })
            .catch(err => {
                setIsNotConnected(true);
            }) 
        }else{
            setIsNotConnected(true);
        }
    }, [])
    if (isNotConnected) {
        return children;
    }
}