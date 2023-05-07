import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSubsider: true,
}

export const userSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        toggleSubSider: (state, { payload }) => {
            if (!payload) {
                console.log("payload", payload)
                state.showSubsider = !state.showSubsider
                return
            }
            state.showSubsider = payload
        },
        resetSettings: (state, { payload }) => {
            if (payload === "all") {
                state = initialState
                return
            }
            state[payload] = initialState[payload]
        },
    },
    extraReducers: {},
})

export const { toggleSubSider } = userSlice.actions

export default userSlice.reducer