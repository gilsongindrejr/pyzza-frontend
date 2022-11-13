import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk('categories/getCategories', async () => {

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + 'categories/';

    return fetch(API_ENDPOINT).then((res) =>
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