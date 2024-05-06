import {createAsyncThunk} from '@reduxjs/toolkit';
import {_businessService} from '../../../services/api/business';

export const fetchBusinesses = createAsyncThunk(
  'business/fetchBusinesses',
  async (_, {rejectWithValue}) => {
    try {
      const response = await _businessService.listBusinesses();
      return response.data;  // Assuming response.data contains the array of businesses
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBusiness = createAsyncThunk(
  'business/createBusiness',
  async (business: any, {rejectWithValue}) => {
    try {
      const response = await _businessService.createBusiness(business);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
