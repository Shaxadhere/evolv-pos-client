import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, { payload }) => {
            state.items.push(payload)
        },
        removeItemFromCart: (state, { payload }) => {
            state.items = state.items.filter(item => item.id !== payload)
        },
        replaceCart: (state, { payload }) => {
            state.items = payload
        },
        resetCart: (state) => {
            state = initialState
            return
        },
    },
    extraReducers: {},
})

export const { addItemToCart, removeItemFromCart, replaceCart, resetCart } = cartSlice.actions

export default cartSlice.reducer