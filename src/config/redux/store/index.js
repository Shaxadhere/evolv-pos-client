import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import userReducer from '../slices/userSlice'
import settingReducer from '../slices/settingSlice'
import cartReducer from '../slices/cartSlice'
import Config from '../../../config';

const rootReducer = combineReducers({
  user: userReducer,
  setting: settingReducer,
  cart: cartReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: Config.env().PERSIST_SECRET_KEY,
      onError: function (error) {
        console.log("encryption failed: ", error)
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)