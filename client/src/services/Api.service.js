import axios from "axios";
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