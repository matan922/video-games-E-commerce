import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authSlice';
import communityReducer from '../Reducers/communitySlice';
import shopReducer from '../Reducers/shopSlice';




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
