import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await api.get('/cart/');
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ animalId, quantity }) => {
  const response = await api.post('/cart/', { animal_id: animalId, quantity });
  return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartId) => {
  await api.delete(`/cart/${cartId}/`);
  return cartId;
});

export const checkoutCart = createAsyncThunk('cart/checkoutCart', async () => {
  const response = await api.post('/cart/checkout/', {});
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;