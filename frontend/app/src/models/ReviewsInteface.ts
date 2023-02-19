export interface Review {
  id: string;
  game: string;
  user_name: string;
  rating: number;
  comment: string;
  time_created?: Date;
}


export interface ReviewState {
  reviews: Review[];
  newReview: Review;
  isError: boolean;
  isSuccess: boolean;
  message: string;
};
