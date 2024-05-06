import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createBusiness, fetchBusinesses} from './businessThunk';
interface BusinessState {
  businesses: any[];
  selectedBusiness: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BusinessState = {
  businesses: [],
  selectedBusiness: null,
  status: 'idle',
  error: null,
};

export const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    selectBusiness: (state, action: PayloadAction<string>) => {
      state.selectedBusiness =
        state.businesses.find(b => b._id === action.payload) || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBusinesses.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.businesses = action.payload;
        state.selectedBusiness = state.businesses[0];
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        state.businesses.push(action.payload);
      });
  },
});

export const {selectBusiness} = businessSlice.actions;
export default businessSlice.reducer;
