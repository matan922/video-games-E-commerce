import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ReviewState } from '../models/ReviewsInteface';
import { getReviewsGame, postReview } from '../APIs/reviewsAPI'


const initialState: ReviewState = {
  reviews: [],
  newReview: Object.create(null),
  isError: false,
  isSuccess: false,
  message: "",
};


export const getReviewsGameAsync = createAsyncThunk(
  'reviews/getReviewsGame',
  async (id: string) => {
    const response = await getReviewsGame(id);
    return response.data;
  }
)


export const postReviewAsync = createAsyncThunk('reviews/postReview', async (reviewData: any, thunkAPI) => {
  try {
    const response = await postReview(reviewData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});



export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess= false;
      state.message = "";
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsGameAsync.fulfilled, (state, action) => {
        state.isError = false
        state.reviews = action.payload
      })
      .addCase(postReviewAsync.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.newReview = action.payload
      })
      .addCase(postReviewAsync.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload as string
      })
  },
});



export const { reset } = reviewsSlice.actions;

export const selectGametReviews = (state: RootState) => state.reviews.reviews;
export const selectUserReviews = (state: RootState) => state.reviews.newReview;
export const selectIsError = (state: RootState) => state.reviews.isError;
export const selectIsSuccess = (state: RootState) => state.reviews.isSuccess;
export const selectMessage = (state: RootState) => state.reviews.message;


export default reviewsSlice.reducer;



