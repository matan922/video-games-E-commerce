import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileAsync, getMyProfileAsync, editMyProfileAsync } from '../../Reducers/communitySlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Spinner from '../../Spinner'
import { Button, Container, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'





const MyProfile = () => {
    const dispatch = useAppDispatch()
    const { display_name, avatar, bio, games, id, isLoading } = useAppSelector((state) => state.community)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [image, setImage] = useState<any>(null);
    const [displayName, setDisplayName] = useState<string>("");
    const [userBio, setUserBio] = useState<string>("");
    const [imageUrl, setImageUrl] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formData = new FormData();
        if (image) {
            formData.append('avatar', image)
        }
        formData.append('display_name', displayName);
        formData.append('bio', userBio);

        dispatch(editMyProfileAsync(formData))
    };


    useEffect(() => {
        dispatch(getMyProfileAsync())
    }, [dispatch])



    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files![0]);
    };

    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserBio(e.target.value);
    };

    return (
        <div>
            <Container>
                {isLoading ? <Spinner></Spinner> : null}
                {avatar} <br />
                Display Name: {display_name} <br></br>
                Bio: {bio} <br></br>
                Games: {games.map(games => <div>{games}</div>)} <br />
                <Button variant="primary" onClick={handleShow}>
                    Edit Profile
                </Button>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="avatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="file" placeholder="Change profile picture" onChange={handleAvatarChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter new display name" onChange={handleDisplayNameChange} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" placeholder="Write your new bio here" onChange={handleBioChange} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary">Save Changes</Button>

                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    )
}

export default MyProfile