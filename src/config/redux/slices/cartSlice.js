import { createSlice } from "@reduxjs/toolkit";
import { ORDER_TYPES, PAYMENT_METHODS } from "../../constants/options";

const initialState = {
  items: [],
  orderNumber: null,
  isFinishing: false,
  isCheckingOut: false,
  paymentMethod: PAYMENT_METHODS[0].name,
  orderType: ORDER_TYPES[0].name,
  customer: "",
  tempQuantity: "0",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      //if items is empty, create new order number and add to orderNumber
      if (state.items.length === 0) {
        state.orderNumber = Date.now();
      }
      //if item already exists in cart, update quantity
      const itemIndex = state.items.findIndex(
        (item) => item._id === payload._id
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity =
          Number(state.items[itemIndex].quantity) + Number(payload.quantity);
        return;
      }
      //else add item to cart
      state.items.push(payload);
    },
    updateQuantity: (state, { payload }) => {
      let items = [...state.items];
      const quantity = payload.quantity;

      if (quantity <= 0) {
        items = items.filter((i) => i._id !== payload._id);
        state.items = items;
        return;
      }
      const itemIndex = items.findIndex((i) => i._id === payload._id);
      if (itemIndex !== -1) {
        items[itemIndex] = {
          ...items[itemIndex],
          quantity,
        };
      }
      state.items = items;
    },
    removeItemFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item._id !== payload);
    },
    replaceCart: (state, { payload }) => {
      state.items = [];
      state.items = payload;
    },
    resetCart: (state) => {
      state.items = [];
      state.orderNumber = null;
      state.isFinishing = false;
      state.isCheckingOut = false;
      state.paymentMethod = PAYMENT_METHODS[0].name;
      state.orderType = ORDER_TYPES[0].name;
      state.customer = "";
      state.tempQuantity = "0";
      return;
    },

    setOrderNumber: (state, { payload }) => {
      state.orderNumber = payload;
    },
    setIsFinishing: (state, { payload }) => {
      state.isFinishing = payload;
    },
    setIsCheckingOut: (state, { payload }) => {
      state.isCheckingOut = payload;
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    setOrderType: (state, { payload }) => {
      state.orderType = payload;
    },
    setCustomer: (state, { payload }) => {
      state.customer = payload;
    },
    updateTempQuantity: (state, { payload }) => {
      state.tempQuantity = payload;
    },
  },
  extraReducers: {},
});

export const {
  updateTempQuantity,
  addItemToCart,
  removeItemFromCart,
  replaceCart,
  resetCart,
  setIsFinishing,
  setOrderNumber,
  setPaymentMethod,
  updateQuantity,
  setOrderType,
  setIsCheckingOut,
  setCustomer,
} = cartSlice.actions;

export default cartSlice.reducer;
