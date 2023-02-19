import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authSlice';
import categoriesReducer from '../Reducers/categoriesSlice';
import communityReducer from '../Reducers/communitySlice';
import orderReducer from '../Reducers/orderSlice';
import ReviewReducer from '../Reducers/reviewsSlice';
import shopReducer from '../Reducers/shopSlice';




export const store = configureStore({
  reducer: {
    shop: shopReducer,
    auth: authReducer,
    community: communityReducer,
    reviews: ReviewReducer,
    categories: categoriesReducer,
    order: orderReducer,
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
