import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collaboratersToDisplay: null,
    collaboraters: null,
};

export const CollaboratersSlice = createSlice({
  name: 'Collaboraters',
  initialState,
  reducers: {
    /**
     * récupère tous les collaborateurs à filtrer dans la barre de recherche
     */
    addAllCollaboraters: (state, action) => {
      state.collaboraters = action.payload.collaboraters;
      state.collaboratersToDisplay = state.collaboraters.slice(0, 10);
    },
    setCollaboratersToDisplay: (state, action) => {
      const collaboratersToDisplay = action.payload.collaboratersToDisplay;
      state.collaboratersToDisplay = state.collaboratersToDisplay.concat(collaboratersToDisplay);
    },
    filterCollaboratersToDisplay: (state, action) => {
      state.collaboratersToDisplay = action.payload.collaboratersToDisplay;
    },
    /**
     * affiche les 10 premiers collaborateurs dans la home page
     */
    displayTenFirstCollaboraters: (state) => {
      state.collaboratersToDisplay = state.collaboraters.slice(0, 10);
    },
    deleteCollaboraterInGlobalState: (state, action) => {
      state.collaboraters = state.collaboraters.filter(collaborater => collaborater.id !== action.payload.userId);
      state.collaboratersToDisplay = state.collaboratersToDisplay.filter(collaborater => collaborater.id !== action.payload.userId);
    },
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
        state.collaboraters = [...state.collaboraters, newUserInfos];
        state.collaboratersToDisplay = [...state.collaboratersToDisplay, newUserInfos];
      }
    },
  },
});

export const { addAllCollaboraters, setCollaboratersToDisplay, filterCollaboratersToDisplay, displayTenFirstCollaboraters, deleteCollaboraterInGlobalState, updateCollaboratersListInGlobalState } = CollaboratersSlice.actions;
export default CollaboratersSlice.reducer;
