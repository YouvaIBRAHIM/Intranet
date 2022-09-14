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
    }
  },
});

export const { addAllCollaboraters, setCollaboratersToDisplay, filterCollaboratersToDisplay, displayTenFirstCollaboraters } = CollaboratersSlice.actions;
export default CollaboratersSlice.reducer;
