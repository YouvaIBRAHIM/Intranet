import { setToSessionStorage } from "../services/SessionStorage.service";
import { useNavigate } from "react-router-dom";

export function disconnect() {
    const navigate = useNavigate();
    setToSessionStorage("token", "");
    navigate('/login');
}