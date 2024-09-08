import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage
import coursesReducer from './coursesSlice.js'; // Adjust the path as needed

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, coursesReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: {
    courses: persistedReducer,
  },
});

// Create a persistor instance
export const persistor = persistStore(store);

export default store;
