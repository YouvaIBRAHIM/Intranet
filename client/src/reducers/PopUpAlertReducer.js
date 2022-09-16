import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    display: false,
    message: "",
    typeValidate: false,
};


export const PopUpAlertSlice = createSlice({
  name: 'PopUpAlert',
  initialState,
  reducers: {
    showPopUpAlert: (state, action) => {
      state.display = action.payload.display;
      state.message = action.payload.message;
      state.typeValidate = action.payload.typeValidate;
    },
    removePopUpAlert: (state) => {
      state.display = false;
      state.message = "";
      state.typeValidate = false;
    }
  }
});

export const { showPopUpAlert, removePopUpAlert } = PopUpAlertSlice.actions;

export default PopUpAlertSlice.reducer;
