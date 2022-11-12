import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice';
import loginReducer from './features/authSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedLoginReducer = persistReducer(persistConfig, loginReducer)

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        auth: persistedLoginReducer,
    },
    middleware: [thunk]
})

export const persistor = persistStore(store)