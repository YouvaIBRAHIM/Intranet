import { configureStore, combineReducers } from '@reduxjs/toolkit';
import UserReducer from "../features/UserReducer";
import CollaboratersReducer from "../features/CollaboratersReducer";

// combine tous les reducers dans un seul reducer
const rootReducer = combineReducers({
    user: UserReducer,
    collaboraters: CollaboratersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
