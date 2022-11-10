import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postLogin = createAsyncThunk('login/postLogin', async (params) => {
    const LOGIN_URL = process.env.REACT_APP_API_ENDPOINT + 'auth/login'

    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (response.ok){
        return await response.json();
    } else {
        throw new Error(`status code ${response.status}`)
    };
});

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: {},
        token: '',
        logged: false,
        error: '',
        loading: false
    },
    reducers: {
        resetError: (state, action) => {
            return {...state, error: ''}
        }
    },
    extraReducers: {
        [postLogin.pending]: (state, action) => {
            state.loading = true;
            console.log('pending')
        },
        [postLogin.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            if (state.token) { state.logged = true }
            console.log('fulfilled')
        },
        [postLogin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
            console.log('rejected')
        }
    }
})

export const {resetError} = loginSlice.actions

export default loginSlice.reducer