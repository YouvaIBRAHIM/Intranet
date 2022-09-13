import { createSlice } from '@reduxjs/toolkit';
import { getFromSessionStorage, setToSessionStorage } from "../services/SessionStorage.service";


let initialState;
const userOnSessionStorage = getFromSessionStorage('user');
const tokenOnSessionStorage = getFromSessionStorage('token');
if (userOnSessionStorage && tokenOnSessionStorage) {
  initialState = {
    user: userOnSessionStorage,
    token: tokenOnSessionStorage
  }
}else{
  initialState = {
    user: {
      birthdate: "",
      city: "",
      country: "",
      email: "",
      firstname: "",
      gender: "",
      id: "",
      isAdmin: false,
      lastname: "",
      phone: "",
      photo: "",
      service: ""
    },
    token: ""
  };
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    /**
     * Enregistre les informations de l'utilisateur dans le state global et dans le SessionStorage
     */
    setUserInfo: (state, action) => {
      state = action.payload.user;
      setToSessionStorage('user', JSON.stringify(state));
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      console.log(state.token);
      setToSessionStorage('token', JSON.stringify(state.token));
    },
    removeToken: (state) => {
      state.token = "";
      setToSessionStorage('token', JSON.stringify(state));
    },
  },
});


export const { setUserInfo, setToken, removeToken } = UserSlice.actions;

export default UserSlice.reducer;
