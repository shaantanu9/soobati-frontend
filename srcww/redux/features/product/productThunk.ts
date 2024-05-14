import {createAsyncThunk} from '@reduxjs/toolkit';
import {_productService} from '../../../services/api/product';
import { ProductQueryPayload } from '../../../utils/interface';
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (query: ProductQueryPayload, {rejectWithValue}) => {
    try {
      const response = await _productService.getAllProducts(query);
      return response.data; // Assuming response.data contains the array of products
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: any, {rejectWithValue}) => {
    try {
      const response = await _productService.createProduct(product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
