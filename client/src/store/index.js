import { configureStore, combineReducers } from '@reduxjs/toolkit';
import UserReducer from "../reducers/UserReducer";
import CollaboratersReducer from "../reducers/CollaboratersReducer";
import PopUpAlertReducer from '../reducers/PopUpAlertReducer';

// combine tous les reducers dans un seul reducer
const rootReducer = combineReducers({
    user: UserReducer,
    collaboraters: CollaboratersReducer,
    popUpAlert: PopUpAlertReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
