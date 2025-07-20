import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get('/orders/');
  return response.data;
});

export const confirmOrder = createAsyncThunk('orders/confirmOrder', async (orderId) => {
  const response = await api.post(`/orders/${orderId}/confirm/`, {});
  return { orderId, status: 'Confirmed' };
});

export const rejectOrder = createAsyncThunk('orders/rejectOrder', async (orderId) => {
  const response = await api.post(`/orders/${orderId}/reject/`, {});
  return { orderId, status: 'Rejected' };
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.orderId);
        state.orders[index].status = action.payload.status;
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.orderId);
        state.orders[index].status = action.payload.status;
      });
  },
});

export default ordersSlice.reducer;