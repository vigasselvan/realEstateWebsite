import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({                        //combineReducers is a function that turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
  user: userReducer,
});

const persistConfig = {                             
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);  // A persisted reducer is a reducer that will automatically save and load from storage and combine with the given reducer.

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }), 
});

export const persistor = persistStore(store);                     //persistor is a persisted and enhanced store that will automatically persist the store's state in between sessions, and rehydrate the state whenever the application reloads.