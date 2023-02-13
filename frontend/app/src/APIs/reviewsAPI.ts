import axios from "axios";
import { getConfig } from "../globalVariables/config";
import { reviewGet, reviewPost } from "../globalVariables/endpoints"
import Review from "../models/ReviewsClass";

export function getAllReviewsPerProduct(id: number) {
    return new Promise<{ data: Review[] }>((resolve) =>
        axios.get(reviewGet + `${id}/`).then(res => resolve({ data: res.data }))
    )
}

export function sendReview(details: any) {
    const accessToken = JSON.parse(String(localStorage.getItem("token")))
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken["access"]
        }
    }
    return new Promise<{ data: any }>((resolve) =>
        axios.post(reviewPost, { description: details.description, rating: details.rating, user: config.headers, id: details.number }, config).then(res => resolve({ data: res.data }))
    )
}
