import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    token: null,
    permissions: [],
    expiryDate: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.user = payload.user
            state.token = payload.token
            state.permissions = payload.permissions
            state.expiryDate = payload.expiryDate
        },
        updateUser: (state, { payload }) => {
            state.user = payload
        },
        removeUser: (state) => {
            state.user = {};
            state.token = null;
            state.permissions = []
            state.expiryDate = null
            localStorage.clear();
        },
    },
    extraReducers: {},
})

export const { addUser, removeUser, updateUser } = userSlice.actions

export default userSlice.reducer