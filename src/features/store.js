import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import activityReducer from './activities/activitySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    activities: activityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 