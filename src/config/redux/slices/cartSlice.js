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
            //if items is empty, create new order number and add to orderNumber
            if (state.items.length === 0) {
                state.orderNumber = Date.now()
            }
            //if item already exists in cart, update quantity
            const itemIndex = state.items.findIndex(item => item.id === payload.id)
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += payload.quantity
                return
            }
            //else add item to cart
            state.items.push(payload)
        },
        updateQuantity: (state, { payload }) => {
            //if quantity is 0, remove item from cart
            if (payload.quantity === 0) {
                state.items = state.items.filter(item => item.id !== payload.id)
                return
            }
            const itemIndex = state.items.findIndex(item => item.id === payload.id)
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = payload.quantity
            }
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

export const { addItemToCart, removeItemFromCart, replaceCart, resetCart, setIsFinishing, setOrderNumber, setPaymentMethod, updateQuantity } = cartSlice.actions

export default cartSlice.reducer