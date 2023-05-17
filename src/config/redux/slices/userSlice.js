import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    token: null,
    store: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.user = payload.user
            state.token = payload.token
            state.store = payload.store
        },
        updateUser: (state, { payload }) => {
            state.user = payload
        },
        removeUser: (state) => {
            state.user = {};
            state.token = null;
            state.store = {};
            localStorage.clear();
        },
    },
    extraReducers: {},
})

export const { addUser, removeUser, updateUser } = userSlice.actions

export default userSlice.reducer