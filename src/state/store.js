import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice';
import loginReducer from './features/loginSlice';

export default configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        auth: loginReducer,
    }
})