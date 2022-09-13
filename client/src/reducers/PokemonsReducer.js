import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalstorage, setToLocalstorage } from "../services/Localstorage.service";

/**
 * state global représentant la liste des pokemons à afficher et à filtrer via la barre de recherche
 * Si on devait afficher tous les pokemons d'un coup, nous perdrions en performances à cause du chargement des images.
 * La clé "allPokemons" est un tableau d'objets contenant seulement le nom et l'url d'un pokemon et est chargée qu'une seule fois
 */
 let initialState;
 const allPokemonsOnLocalStorage = getFromLocalstorage('allPokemons');
 if (allPokemonsOnLocalStorage) {
  initialState = {
    allPokemons: allPokemonsOnLocalStorage,
    pokemons: [],
    nextUrl: 'https://pokeapi.co/api/v2/pokemon/'
   };
 }else{
   initialState = {
    allPokemons: null,
    pokemons: [],
    nextUrl: 'https://pokeapi.co/api/v2/pokemon/'
   };
 }

export const PokemonsSlice = createSlice({
  name: 'Pokemons',
  initialState,
  reducers: {
    /**
     * Ajoute les pokemons à afficher dans la home page
     */
    addPokemons: (state, action) => {
      state.pokemons = [ ...state.pokemons, ...action.payload.pokemons];
      state.nextUrl = action.payload.nextUrl;
    },
    /**
     * récupère tous les pokemons à filtrer dans la barre de recherche
     */
    addAllPokemons: (state, action) => {
      state.allPokemons = action.payload.allPokemons;
      setToLocalstorage('allPokemons', JSON.stringify(action.payload.allPokemons));
    },
    /**
     * éfface les pokemons à afficher de la home page
     */
    clearPokemons: (state) => {
      state.pokemons = [];
      state.nextUrl = 'https://pokeapi.co/api/v2/pokemon/';
    }
  },
});

export const { addPokemons, addAllPokemons, clearPokemons } = PokemonsSlice.actions;
export default PokemonsSlice.reducer;
