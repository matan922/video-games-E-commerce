import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getAllReviewsPerProductAsync, selectReviewDescription, sendReviewAsync } from '../../Reducers/reviewsSlice'
import Rating from '@mui/material/Rating';
import { selectIsLogged } from '../../Reducers/authSlice'

const Reviews = () => {
    const iretroBrown = "rgb(62,56,54)";
    let logged = useAppSelector(selectIsLogged) // Change to if bought, not if logged in.
    let { number } = useParams()
    let dispatch = useAppDispatch()
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const reviewInfo = useAppSelector(selectReviewDescription)
    
    useEffect(() => {
        dispatch(getAllReviewsPerProductAsync(Number(number)))
    }, [])


    return (
        <div className='text-center'>
            <hr />
            {/* <th colSpan={2} style={{ color: iretroBrown }}>Reviews</th> */}
            <h1 style={{ color: iretroBrown }}>Reviews</h1>
            {reviewInfo.map((review, index) =>
                <div key={index}>
                    <p>Name: {review.customer_name}</p>
                    Review: {review.description}
                </div>
            )}
            <hr />
            <h3>New Review:</h3>
            <div>
                <p>Rate This Product: </p>
                <Rating
                    value={rating}
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    onChange={(e) => setRating(+((e.target as HTMLInputElement).value))} />
            </div>
            <br />
            Leave A Description: <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} />
            {logged &&
                <Button onClick={() => dispatch(sendReviewAsync({ rating, description, number }))}>
                    Send
                </Button>}
        </div>
    )
}

export default Reviews
