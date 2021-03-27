import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '../services/authService';
import jwtDecode from 'jwt-decode';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credential, thunkAPI) => {
    try {
      const data = await auth.login(credential);

      return jwtDecode(data.token);
    } catch (error) {
      console.log(error);
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    loadAuthenticatedUser: (user, { payload }) => {
      console.log('user ', user);
      console.log('payload ', payload);
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => ({
      ...state,
      isSuccess: true,
      user: payload,
    }),
  },
});

export const { loadAuthenticatedUser } = authSlice.actions;

export default authSlice;
