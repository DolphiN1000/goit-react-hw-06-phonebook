import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';

import contactsReducer from './phonebook/phonebook-slice';
import filterReducer from './filter/filter-slice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
