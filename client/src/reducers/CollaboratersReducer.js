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
      state.collaboratersToDisplay = action.payload.collaboratersToDisplay;
    },
    /**
     * efface les collaborateurs à afficher de la home page
     */
    clearCollaboraters: (state) => {
      state.collaboratersToDisplay = null;
    }
  },
});

export const { addAllCollaboraters, setCollaboratersToDisplay, clearCollaboraters } = CollaboratersSlice.actions;
export default CollaboratersSlice.reducer;
