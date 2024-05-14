import {createSlice} from '@reduxjs/toolkit';
import {
  addItemToCart,
  fetchCart,
  removeItemFromCart,
  updateItemQuantity,
} from './cartThunk';

interface CartItem {
  productId: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  options: {
    size?: string;
    color?: string;
    subscriptionPlanId?: string;
  };
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  completeCart: any;
}

const initialState: CartState = {
  items: [],
  completeCart: {},
  totalQuantity: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Additional reducer logic if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.completeCart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item => item.productId === action.payload.itemId,
        );
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => item.productId !== action.payload,
        );
      });
  },
});

export default cartSlice.reducer;
