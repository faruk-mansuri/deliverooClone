import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  noOfCartItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      }

      state.noOfCartItems += 1;
      state.totalAmount += payload.price;
    },

    removeFromCart: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);

      state.noOfCartItems -= cartItem.quantity;
      state.totalAmount -= cartItem.price * cartItem.quantity;
    },

    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
