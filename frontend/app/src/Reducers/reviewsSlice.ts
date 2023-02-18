import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ReviewState } from '../models/ReviewsInteface';
import { getReviewsGame, postReview } from '../APIs/reviewsAPI'


const initialState: ReviewState = {
    reviews: [],
    newReview: Object.create(null)
};


export const getReviewsGameAsync = createAsyncThunk(
  'reviews/getReviewsGame',
  async (id: string) => {
    const response = await getReviewsGame(id);
    return response.data;
  }
)


export const postReviewAsync = createAsyncThunk(
  'reviews/postReview', 
  async (reviewData: any) => {
      const response = await postReview(reviewData);
      return response.data
  }
)



export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsGameAsync.fulfilled, (state, action) => {
        state.reviews = action.payload
      })
      .addCase(postReviewAsync.fulfilled, (state, action) => {
        state.newReview = action.payload
        console.log(state.newReview)
      })
  },
});



// export const { getSingleProduct, setSingleProduct } = productSlice.actions;

export const selectGametReviews = (state: RootState) => state.reviews.reviews;
export const selectUserReviews = (state: RootState) => state.reviews.newReview;

export default reviewsSlice.reducer;



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";
// import Review from "../models/ReviewsClass";
// import { getAllReviewsPerProduct, sendReview } from "../APIs/reviewsAPI";

// export interface ReviewState {
//     status: 'idle' | 'loading' | 'failed';
//     review: Review[]
//     amountReviews: number
//     rating: number
// }

// const initialState: ReviewState = {
//     status: 'idle',
//     review: [],
//     amountReviews: 0,
//     rating: 0
// }

// export const getAllReviewsPerProductAsync = createAsyncThunk(
//     'review/getAllReviewsPerProduct',
//     async (id: number) => {
//         const response = await getAllReviewsPerProduct(id);
//         return response.data;
//     }
// )

// export const sendReviewAsync = createAsyncThunk(
//     'review/sendReview',
//     async (details: any) => {
//         const response = await sendReview(details);
//         return response.data
//     }
// )

// export const ReviewSlice = createSlice({
//     name: "review",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAllReviewsPerProductAsync.fulfilled, (state, action) => {
//             state.review = action.payload
//         })
//     }
// })

// export const { } = ReviewSlice.actions;
// export const selectReviewDescription = (state: RootState) => state.review.review
// export default ReviewSlice.reducer;
