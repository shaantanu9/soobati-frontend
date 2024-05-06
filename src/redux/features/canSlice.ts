// src/features/cansSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CanState {
  name: string;
  age: number;
}

const initialState: CanState = {
  name: '',
  age: 0,
};

export const canSlice = createSlice({
  name: 'can',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CanState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
    },
  },
});

export const {setUser} = canSlice.actions;
export default canSlice.reducer;
