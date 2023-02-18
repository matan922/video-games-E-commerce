import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react'
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsLogged } from '../../Reducers/authSlice';
import { selectGame } from '../../Reducers/shopSlice';
import { getReviewsProductAsync, postReviewAsync, selectProductReviews } from '../../Reducers/reviewsSlice'
import { BsTrash } from "react-icons/bs";

const Reviews = () => {
    const myServer = "http://127.0.0.1:8000"
    const ifLogged = useAppSelector(selectIsLogged)
    const singleGame = useAppSelector(selectGame)
    const gameReview = useAppSelector(selectProductReviews)


    const { id } = useParams()

    const dispatch = useAppDispatch()

    const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string)


    useEffect(() => {
        if (id !== undefined) {
        dispatch(getReviewsProductAsync(Number(id)))
        }
    }, [id])

    // const [product, setProduct] = useState<string>(String(singleGame.my_app.id));
    const [name, setName] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number>(0)
    const [picture, setPicture ] = useState<any>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
      
        const formData = new FormData();
        formData.append('product', String("singleGame"));
        formData.append('name', name);
        formData.append('comment', comment);
        formData.append('rating', Math.round(rating).toString());
      console.log(formData)


        dispatch(postReviewAsync(formData));
        if ( singleGame.my_app) {
        // setProduct(String(singleGame.my_app.id));}
        setName('');
        setComment('');
        setRating(0);
        setPicture('');

        setTimeout(() => {
            window.location.reload();
          }, 1)
      };
      
      const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPicture(event.target.files ? event.target.files[0] : undefined);
      }

    
      const [sum, setSum] = useState<number>(0);
        const [count, setCount] = useState<number>(0);

    useEffect(() => {
    if (gameReview.length) {
        const total = gameReview.reduce((acc, review) => acc + review.rating, 0);
        setSum(total);
        setCount(gameReview.length);
    }
    }, [gameReview]);

const average = count ? sum / count : 0;

const [showModal, setShowModal] = useState(false);
const handleClose = () => setShowModal(false);
const handleShow = () => setShowModal(true);

    

    return (
        <div>asdsad</div>
    )
    }
//         <div>

        
//         <div className='text-left'>
            
//             <br /><br /><br /><br /><br /><br />
//             <h3>REVIEWS</h3><br /><br />

            
            
//     {ifLogged ? (<div>
//                 <div>
//                 <Form onSubmit={handleSubmit} encType="multipart/form-data" style = {{width: "50%"}}>
//                 <b>Rate This Product:
//                 <Rating style={{ position: 'absolute', transform: ' translateX(10px) translateY(-2px) ' }} 
//                 value={rating} name="half-rating" defaultValue={2.5} precision={0.5} onChange={(e) => setRating(+((e.target as HTMLInputElement).value))} /> </b><br/><br/>
//                 <Form.Group controlId="formFirstName">
//                             <Form.Label>First Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 onChange={(event) => setName(event.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formComment">
//                             <Form.Label>Comment</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 onChange={(event) => setComment(event.target.value)}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formPicture">
//                             <Form.Label>Picture (optional)</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 onChange={handlePictureChange}
//                             />
//                         </Form.Group><br/>
//                         <Button variant="warning" type="submit">
//                             SUBMIT REVIEW
//                         </Button>

//                     </Form><br />
                    
//                     <h4 style = {{display: 'flex', justifyContent: 'center'}}>Average rating: {average.toFixed(1)} &#9733;</h4>
                    
                    
//                     <hr/>
//                     </div>
//                     <br /><br />
//             </div>
//         ) : ('')}

//         {gameReview.map((review) => (
//             <div key={review.id}>
//                 <Card style={{ height: '240px', width: "80%"}}>
//                 <Card.Title style={{ position: 'absolute', transform: ' translateX(15px) translateY(10px) ' }}>
//                     <b>RATING: </b>{review.rating.toFixed(1)} &#9733;
//                 </Card.Title>
//                 <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(30px) ' }}>
//                     {review.name}:
//                 </Card.Body>
//                 <Card.Body style={{ position: 'absolute', transform: ' translateX(100px) translateY(30px) ' }}>
//                     {review.comment}
//                 </Card.Body>
//                 <Card.Body style={{ position: 'absolute', bottom: -4, left: -18, transform: 'translateX(15px)' }}>

//                 {storedIsStaff && (<Button variant="danger" onClick = {handleShow}> <h4><BsTrash /> </h4></Button>)}
//                 <Modal show={showModal} onHide={handleClose} animation={false}>
//                 <Modal.Header closeButton>
//                   <Modal.Title><BsTrash /> Delete Warning</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to delete {review.name}'s review?</Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleClose}>
//                     Close
//                   </Button>
//                 </Modal.Footer>
//               </Modal>
                

//                 </Card.Body>
//                 </Card><br />
//             </div>
//         ))}
//     </div>
// </div>
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
