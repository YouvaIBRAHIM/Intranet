import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../services/Utils.service";
import { getFromSessionStorage } from '../services/SessionStorage.service';


export default function IsAdminRoute({children}) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const token = getFromSessionStorage('token');
    const user = parseJwt(token);

    useEffect(()=>{
        if (user.isAdmin) {
            setIsAdmin(true)
        }else{
            navigate("/home")
        }
    }, [])

    if (isAdmin) {
        return children;
    }
}