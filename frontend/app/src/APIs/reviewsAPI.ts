import axios from "axios";
import { getConfig } from "../globalVariables/config";
import { reviewGet, reviewPost } from "../globalVariables/endpoints";
import { Review } from "../models/ReviewsInteface";

export function getReviewsGame(id: string) {
  return new Promise<{ data: Review[] }>((resolve) =>
    axios.get(reviewGet + `${id}/`).then((res) => resolve({ data: res.data })));
}


export function postReview(reviewData: Review) {
  return new Promise<{ data: Review }>((resolve, reject) =>
    axios.post(reviewPost, reviewData, getConfig())
      .then(res => {
        resolve({data: res.data});
      })
      .catch(error => {
        reject(error.response.data[0]);
      })
  );
}

