import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk('categories/getCategories', async () => {

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + 'categories/';
    const API_TOKEN = process.env.REACT_APP_API_TOKEN

    return fetch(API_ENDPOINT, { headers: { 'Authorization': `Token ${API_TOKEN}` } }).then((res) =>
     res.json()
    );
});

export const categorySlice = createSlice({
    name: 'categories',
    initialState: { 
        categories: [],
        loading: false,
    },
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.loading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.loading = false;
        }
    }
});

export default categorySlice.reducer