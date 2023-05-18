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
            const itemIndex = state.items.findIndex(item => item._id === payload._id)
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += payload.quantity
                return
            }
            //else add item to cart
            state.items.push(payload)
        },
        updateQuantity: (state, { payload }) => {
            let items = [...state.items]
            const quantity = payload.quantity

            if (quantity <= 0) {
                items = items.filter(i => i._id !== payload._id)
                state.items = items
                return
            }
            const itemIndex = items.findIndex(i => i._id === payload._id)
            if (itemIndex !== -1) {
                items[itemIndex] = {
                    ...items[itemIndex],
                    quantity
                }
            }
            state.items = items
        },
        removeItemFromCart: (state, { payload }) => {
            state.items = state.items.filter(item => item._id !== payload)
        },
        replaceCart: (state, { payload }) => {
            state.items = []
            state.items = payload
        },
        resetCart: (state) => {
            state.items = []
            state.orderNumber = null
            state.isFinishing = false
            state.paymentMethod = PAYMENT_METHODS[0].name
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