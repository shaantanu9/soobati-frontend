// src/features/user/userThunks.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import {_userAccountService} from '../../services/api/user';
import {setUser} from './userSlice';

// Example of an async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async (userId, {dispatch}) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      dispatch(setUser(data)); // Assuming 'setUser' can accept this data directly
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  },
);

// login user with mobile number and password

export const loginWithPassword = createAsyncThunk(
  'user/loginWithPassword',
  async (
    {mobile, password}: {mobile: string; password: string},
    {rejectWithValue},
  ) => {
    console.log('line 25 from userSlice.ts', mobile, password);
    try {
      const response = await _userAccountService.loginUserWithPassword({
        mobile,
        password,
      });
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
        return rejectWithValue('Failed to verify password');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
