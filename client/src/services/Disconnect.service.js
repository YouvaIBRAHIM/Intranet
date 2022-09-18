import { removeFromSessionStorage } from "../services/Storage.service";

/**
 * déconnecte l'utilisateur et redirige vers la page de login
 * @param {Function} navigate hook permettant de changer le route
 */
export function disconnect(navigate) {
    removeFromSessionStorage("token");
    removeFromSessionStorage("user");
    navigate('/login');
}