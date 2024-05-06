import {createAsyncThunk} from '@reduxjs/toolkit';
import {_orderService} from '../../../services/api/order';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, {rejectWithValue}) => {
    try {
      const response = await _orderService.listCustomerOrders(); // Adjust based on user role if needed
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: any, {rejectWithValue}) => {
    try {
      const response = await _orderService.createOrder(orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async (
    {orderId, updateData}: {orderId: string; updateData: any},
    {rejectWithValue},
  ) => {
    try {
      const response = await _orderService.updateOrderStatus(
        orderId,
        updateData,
      );
      return {orderId, updateData, data: response.data};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, {rejectWithValue}) => {
    try {
      await _orderService.deleteOrder(orderId);
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
