import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsLogged } from "../../Reducers/authSlice";
import {
  getReviewsGameAsync,
  postReviewAsync,
  reset,
  selectGametReviews,
  selectIsError,
  selectIsSuccess,
  selectMessage,
} from "../../Reducers/reviewsSlice";
import "../../css/General.css";

const Reviews = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams();
  const gameReviews = useAppSelector(selectGametReviews);
  const isLogged = useAppSelector(selectIsLogged);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const isError = useAppSelector(selectIsError);
  const message = useAppSelector(selectMessage);
  const isSuccess = useAppSelector(selectIsSuccess);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());

    if (number) {
      dispatch(getReviewsGameAsync(number));
    }
  }, [number, isSuccess, isError]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      rating: rating,
      comment: comment,
      game: number,
    };
    if (data.comment == "" || data.rating == 0) {
      toast.error("Fill the form.");
    } else {
      try {
        dispatch(postReviewAsync(data));
        toast.success("Review has been posted!")
        dispatch(reset());
      } catch {
        dispatch(reset());
      }
    }
  };

  return (
    <div>
      {isLogged ? (
        <div>
          <br />

          <Form onSubmit={handleSubmit}>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                if (newValue) {
                  setRating(newValue);
                }
              }}
            />

            <Form.Group controlId="formReviewComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your review"
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </div>
      ) : (
        <p>To leave a review please log in.</p>
      )}

      {gameReviews.map((review) => (
        <div>
          <div className="div-center">
            <br />
            User: {review.user_name}
            <br></br>
            Comment: {review.comment}
            <br></br>
            rating: {review.rating}
            <br></br>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
