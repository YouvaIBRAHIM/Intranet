import axios from "axios";

/**
 * permet de s'authentifier via une requete API de type POST 
 * @param {Object} identifiers contient les clés "email" et "password" nécessaires pour s'authentifier
 * @returns Si les identifiants sont correctes, la fonction retourne les informations de l'utilisateur et un token valide, sinon elle retourne une erreur
 */
export async function onLogin(identifiers) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const loginApi = import.meta.env.VITE_LOGIN_API;  
  
  try {
    const response = await axios.post(`${serverUrl}${loginApi}`, identifiers)
    return response;
  } catch (error) {
    return error.response;
  }
}

/**
 * récupère un collaborateur au hasard via une requete API
 * @param {String} token 
 * @returns la réponse de la requete API axios 
 */
export async function getRandomCollaborater(token) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const randomCollaboraterApi = import.meta.env.VITE_RANDOM_COLLABORATER_API;  
  
  try {
    const response = await axios.get(`${serverUrl}${randomCollaboraterApi}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    return error.response;
  }
}

/**
 * récupère la liste de tous les collaborateurs via une requete API
 * @param {String} token 
 * @returns un tableau d'objets de tous les collaborateurs 
 */
 export async function getCollaboratersListFromApi(token) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const collaboraterListApi = import.meta.env.VITE_COLLABORATERS_LIST_API;  
  
  try {
    const response = await axios.get(`${serverUrl}${collaboraterListApi}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    return error.response;
  }
}


 export async function updateUser(token, data, id) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const handleUserApi = import.meta.env.VITE_HANDLE_USER_API;  
  
  try {
    const response = await axios.put(`${serverUrl}${handleUserApi}/${id}`, data,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    return error.message;
  }
}


export async function addeUser(token, data) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const handleUserApi = import.meta.env.VITE_HANDLE_USER_API;  
  
  try {
    const response = await axios.post(`${serverUrl}${handleUserApi}`, data,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}