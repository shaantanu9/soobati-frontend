import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createProduct, fetchProducts} from './productThunk';
interface ProductState {
  // products: IProduct[];
  // selectedProduct: IProduct | null;
  products: any[];
  selectedProduct: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct =
        state.products.find(p => p._id === action.payload) || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export const {selectProduct} = productSlice.actions;
export default productSlice.reducer;
