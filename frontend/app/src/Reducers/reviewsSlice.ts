import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ReviewState } from '../models/ReviewsInteface';
import { getReviewsProduct, postReview } from '../APIs/reviewsAPI'




const initialState: ReviewState = {
  single_review: { id: "", game: "", user: "", name: "", rating: 0, comment: "" },
  reviews_product: [],
  reviews_user: [],
  allReviews: []
};


export const getReviewsProductAsync = createAsyncThunk(
  'reviews/getReviewsProduct',
  async (id: number) => {
    const response = await getReviewsProduct(id);
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
      .addCase(getReviewsProductAsync.fulfilled, (state, action) =>
      {
        state.reviews_product = action.payload
      })
      .addCase(postReviewAsync.fulfilled, (state, action) => {
        state.allReviews = [...state.allReviews, action.payload];
        console.log(action.payload)
      })
  },
});



// export const { getSingleProduct, setSingleProduct } = productSlice.actions;

export const selectProductReviews = (state: RootState) => state.reviews.reviews_product;
export const selectUserReviews = (state: RootState) => state.reviews.reviews_user;
export const selectSingleReview = (state: RootState) => state.reviews.single_review;

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
