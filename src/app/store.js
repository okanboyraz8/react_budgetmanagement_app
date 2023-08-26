import { configureStore } from '@reduxjs/toolkit';

//"authReducer" adında "authSlice" dosyasının import edilmesi:
import authReducer from '../features/auth/authSlice';

//"processReducer" adında "processSlice" dosyasının import edilmesi:
import processReducer from '../features/process/processSlice';

//Note: Redux Toolkit ile state incelenebilir
export const store = configureStore({
  reducer: {
    auth: authReducer,
    process: processReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
