import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getProducts = createAsyncThunk('products/getProducts', async (params) => {

    let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + 'products/';
    const API_TOKEN = process.env.REACT_APP_API_TOKEN

    if(Object.keys(params).length > 0){
        API_ENDPOINT = API_ENDPOINT + '?'
    }

    let putAmpersand = () => {
        if(Object.keys(params).length > 0){
            API_ENDPOINT = API_ENDPOINT + '&'
        }
    }

    if(params.search){
        API_ENDPOINT = API_ENDPOINT + `search=${params.search}`
        delete params.search
        putAmpersand();
    }

    if(params.filter){
        API_ENDPOINT = API_ENDPOINT + `filter=${params.filter}`
        delete params.filter
        putAmpersand();
    }

    return fetch(API_ENDPOINT, { headers: { 'Authorization': `Token ${API_TOKEN}` } }).then((res) =>
        res.json()
    );
})


export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false;
        }

    }
})

export default productSlice.reducer