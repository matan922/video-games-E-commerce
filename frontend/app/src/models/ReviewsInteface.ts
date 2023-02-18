export interface Review {
    id: string;
    game: string;
    user: string;
    name: string;
    rating: number;
    comment: string;
    time_created?: Date;
    }
  
  
    export interface ReviewState {
      single_review: Review
      reviews_product: Review[];
      reviews_user: Review[];
      allReviews: Review[];
    };
  