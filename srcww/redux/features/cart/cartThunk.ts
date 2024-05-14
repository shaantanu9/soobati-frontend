import { createAsyncThunk } from '@reduxjs/toolkit';
import { _cartService } from '../../../services/api/cart';

export interface CartItemProps {
  productId: string;
  quantity: number;
  pricePerUnit: number;
  options: any;
}

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await _cartService.getCart();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add item to cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item: CartItemProps, { rejectWithValue }) => {
    try {
      const response = await _cartService.addItemToCart(item);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update item quantity
export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ itemId, quantity }: { itemId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await _cartService.updateItemQuantity(itemId, quantity);
      return { itemId, quantity, data: response.data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await _cartService.removeItemFromCart(itemId);
      return itemId;  // Assuming the backend does not send back the updated cart
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// updateCartQuantity

