import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectIsLogged } from "../../Reducers/authSlice"
import { getReviewsGameAsync, postReviewAsync, selectGametReviews } from "../../Reducers/reviewsSlice"


const Reviews = () => {
    const dispatch = useAppDispatch()
    const {number} = useParams()
    const gameReviews = useAppSelector(selectGametReviews)
    const isLogged = useAppSelector(selectIsLogged)


    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")


    useEffect(() => {
        if (number) {
            dispatch(getReviewsGameAsync(number))
        }
    }, [number])
    
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            rating: rating,
            comment: comment,
            game:number
        }
        if (data.comment == "" && data.rating == 0) {
            toast.error("Fill the form.")
        }

        dispatch(postReviewAsync(data))
      };
    
    
    return (
    <div>

        {isLogged ?         
        <div>
                <br />

            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formReviewRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control as="select" onChange={(e) => setRating(+e.target.value)}>
                <option value={0}>Select a rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formReviewComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your review" onChange={(e) => setComment(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit Review
            </Button>
            </Form>
        </div>
        : <p>To leave a review please log in.</p>}

                {gameReviews.map(review => <div><br />
                User: {review.user_name}<br></br>
                Comment: {review.comment}<br></br>
                rating: {review.rating}<br></br>
                </div>)}


    </div>
    )
}


export default Reviews



// import React, { useEffect, useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { useParams } from 'react-router-dom'
// import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { getAllReviewsPerProductAsync, selectReviewDescription, sendReviewAsync } from '../../Reducers/reviewsSlice'
// import Rating from '@mui/material/Rating';
// import { selectIsLogged } from '../../Reducers/authSlice'

// const Reviews = () => {
//     let logged = useAppSelector(selectIsLogged) // Change to if bought, not if logged in.
//     let { number } = useParams()
//     let dispatch = useAppDispatch()
//     const [rating, setRating] = useState(0)
//     const [description, setDescription] = useState("")
//     const reviewInfo = useAppSelector(selectReviewDescription)
    
//     useEffect(() => {
//         dispatch(getAllReviewsPerProductAsync(Number(number)))
//     }, [reviewInfo])
    


//     return (
//         <div className='text-center'>
//             <hr />
//             {/* <th colSpan={2} style={{ color: iretroBrown }}>Reviews</th> */}
//             <h1 style={{ color: "#C7D5E0" }}>Reviews</h1>
//             {reviewInfo.map((review, index) =>
//                 <div key={index}>
//                     <p>Name: {review.customer_name}</p>
//                     {review.rating} <br />
//                     Review: {review.description}
//                 </div>
//             )}
//             <hr />
//             <h3>New Review:</h3>
//             <div>
//                 <p>Rate This Product: </p>
//                 <Rating
//                     value={rating}
//                     name="half-rating"
//                     defaultValue={2.5}
//                     precision={0.5}
//                     onChange={(e) => setRating(+((e.target as HTMLInputElement).value))} />
//             </div>
//             <br />
//             Leave A Description: <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} />
//             {logged &&
//                 <Button onClick={() => dispatch(sendReviewAsync({ rating, description, number }))}>
//                     Send
//                 </Button>}
//         </div>
//     )
// }

// export default Reviews
