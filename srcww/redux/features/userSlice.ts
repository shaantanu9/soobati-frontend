// src/features/userSlice.ts
import {_userAccountService} from '../../services/api/user';

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearAll} from '../../utils';
import {loginWithPassword} from './userThunk';

interface UserState {
  name: string;
  mobile: string;
  token: string;
  userId: string;
  verified: boolean;
  secretkey: string;
}

const initialState: UserState = {
  name: '',
  mobile: '',
  token: '',
  userId: '',
  verified: false,
  secretkey: '',
};

export const verifyOTP = createAsyncThunk(
  'user/verifyOTP',
  async ({mobile, otp}: {mobile: string; otp: string}, {rejectWithValue}) => {
    console.log('line 25 from userSlice.ts', mobile, otp);
    try {
      const response = await _userAccountService.loginOTPVerify({mobile, otp});
      console.log('line 28 from userSlice.ts', response);
      if (response.statusCode === 200) {
        // Assuming the response structure you provided
        return {
          token: response.data.token,
          name: response.data.user.name,
          mobile: response.data.user.mobile,
          userId: response.data.user._id,
          verified: response.data.user.verified,
          secretkey: response.data.user.secretkey,
        };
      } else {
        return rejectWithValue('Failed to verify OTP');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.verified = action.payload.verified;
      state.secretkey = action.payload.secretkey;
    },
    logoutUser: state => {
      
      clearAll();
      // Clear the user state
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.mobile = action.payload.mobile;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.verified = action.payload.verified;
        state.secretkey = action.payload.secretkey;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.mobile = action.payload.mobile;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.verified = action.payload.verified;
        state.secretkey = action.payload.secretkey;
      });
  },
});

export const {setUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
