import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';

export default combineReducers({
  auth: authSlice.reducer,
  users: userSlice.reducer,
});
