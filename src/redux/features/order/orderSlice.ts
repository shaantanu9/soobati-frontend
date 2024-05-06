import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrders, createOrder, updateOrderStatus, deleteOrder } from './orderThunk';
interface OrderItem {
    productId: string;
    productName: string;
    customerName: string;
    quantity: number;
    price: number;
    orderType: string;
    status: string;
    paymentStatus: string;
    deliveryStatus: string;
    deliveryAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface OrderState {
    orders: OrderItem[];
    selectedOrder: OrderItem | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: OrderState = {
    orders: [],
    selectedOrder: null,
    status: 'idle',
    error: null,
  };
  

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrder = state.orders.find(o => o.productId === action.payload) || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.productId === action.payload.orderId);
        if (index !== -1) {
          state.orders[index] = { ...state.orders[index], ...action.payload.updateData };
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.productId !== action.payload);
      });
  },
});

export const { selectOrder } = orderSlice.actions;
export default orderSlice.reducer;
