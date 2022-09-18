import { createSlice } from '@reduxjs/toolkit';
import { setToLocalStorage, getFromLocalStorage } from '../services/Storage.service';

const collaboratersFromSessionStorage = getFromLocalStorage('collaboraters');
// les collaborateurs sont déjà stockés dans le local storage, on les met dans le state global
const initialState = {
    collaboratersToDisplay: collaboratersFromSessionStorage ? collaboratersFromSessionStorage.slice(0, 10) : null,
    collaboraters: collaboratersFromSessionStorage ? collaboratersFromSessionStorage : null,
};

export const CollaboratersSlice = createSlice({
  name: 'Collaboraters',
  initialState,
  reducers: {

    /**
     * récupère tous les collaborateurs
     */
    addAllCollaboraters: (state, action) => {
      state.collaboraters = action.payload.collaboraters;
      state.collaboratersToDisplay = state.collaboraters.slice(0, 10);
      setToLocalStorage('collaboraters', JSON.stringify(state.collaboraters));
    },
    /**
    * met à jour les collaborateurs à afficher
    */
    setCollaboratersToDisplay: (state, action) => {
      const collaboratersToDisplay = action.payload.collaboratersToDisplay;
      state.collaboratersToDisplay = state.collaboratersToDisplay.concat(collaboratersToDisplay);
    },
    /**
    * met à jour les collaborateurs à afficher lors d'une recherche
    */
    filterCollaboratersToDisplay: (state, action) => {
      state.collaboratersToDisplay = action.payload.collaboratersToDisplay;
    },
    /**
     * affiche les 10 premiers collaborateurs dans la home page
     */
    displayTenFirstCollaboraters: (state) => {
      state.collaboratersToDisplay = state.collaboraters.slice(0, 10);
    },
    /**
    * supprime un collaborateur de la liste
    */
    deleteCollaboraterInGlobalState: (state, action) => {
      state.collaboraters = state.collaboraters.filter(collaborater => collaborater.id !== action.payload.userId);
      state.collaboratersToDisplay = state.collaboratersToDisplay.filter(collaborater => collaborater.id !== action.payload.userId);
      setToLocalStorage('collaboraters', JSON.stringify(state.collaboraters));
    },
    /**
    * met à jour les informations d'un collaborateur de la liste ou le rajoute si c'est un nouveau
    */
    updateCollaboratersListInGlobalState: (state, action) => {
      const userId = action.payload.user?.id;
      const newUserInfos = action.payload.user;
      if(userId){
        state.collaboraters = state.collaboraters.map(collaborater => {
          if (collaborater.id === userId) {
            return newUserInfos;
          }
          return collaborater;
        });
        state.collaboratersToDisplay = state.collaboratersToDisplay.map(collaborater => {
          if (collaborater.id === userId) {
            return newUserInfos;
          }
          return collaborater;
        });
      }else{
        state.collaboraters = [...state.collaboraters, {...newUserInfos, id: action.payload.userId}];
        state.collaboratersToDisplay = [...state.collaboratersToDisplay, {...newUserInfos, id: action.payload.userId}];
      }
      setToLocalStorage('collaboraters', JSON.stringify(state.collaboraters));

    },
  },
});

export const { addAllCollaboraters, setCollaboratersToDisplay, filterCollaboratersToDisplay, displayTenFirstCollaboraters, deleteCollaboraterInGlobalState, updateCollaboratersListInGlobalState } = CollaboratersSlice.actions;
export default CollaboratersSlice.reducer;
