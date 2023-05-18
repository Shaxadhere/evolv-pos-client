import { createSlice } from '@reduxjs/toolkit';
import { PAYMENT_METHODS } from '../../constants/options';

const initialState = {
    items: [],
    orderNumber: null,
    isFinishing: false,
    paymentMethod: PAYMENT_METHODS[0].name,
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

        setOrderNumber: (state, { payload }) => {
            state.orderNumber = payload
        },
        setIsFinishing: (state, { payload }) => {
            state.isFinishing = payload
        },
        setPaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload
        }
    },
    extraReducers: {},
})

export const { addItemToCart, removeItemFromCart, replaceCart, resetCart, setIsFinishing, setOrderNumber, setPaymentMethod } = cartSlice.actions

export default cartSlice.reducer