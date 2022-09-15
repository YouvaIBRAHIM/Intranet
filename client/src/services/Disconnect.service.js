import { removeFromSessionStorage } from "../services/SessionStorage.service";

export function disconnect(navigate) {
    removeFromSessionStorage("token");
    navigate('/login');
}