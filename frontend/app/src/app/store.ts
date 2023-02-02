import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  authReducer from '../features/authenticationTry/authSlice';
import communityReducer from '../features/community/communitySlice';
import shopReducer from '../features/shop/shopSlice';




export const store = configureStore({
  reducer: {
    shop: shopReducer,
    auth: authReducer,
    community: communityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
