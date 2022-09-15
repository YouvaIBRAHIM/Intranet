import { createSlice } from '@reduxjs/toolkit';
import { getFromSessionStorage, setToSessionStorage } from "../services/SessionStorage.service";


let initialState;
const userOnSessionStorage = getFromSessionStorage('user');
if (userOnSessionStorage && tokenOnSessionStorage) {
  initialState = {
    user: userOnSessionStorage,
  }
}else{
  initialState = {
    user: {
      birthdate: "",
      city: "",
      country: "",
      email: "",
      firstname: "",
      lastname: "",
      gender: "",
      id: "",
      isAdmin: false,
      phone: "",
      service: ""
    }
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
    }

  },
});


export const { setUserInfo } = UserSlice.actions;

export default UserSlice.reducer;
