import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getMyProfileAsync,
  editMyProfileAsync,
} from "../../Reducers/communitySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../Spinner";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const { display_name, avatar, bio, games_bought, id, isLoading } =
    useAppSelector((state) => state.community);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [image, setImage] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("avatar", image);
    }
    if (displayName) {
      formData.append("display_name", displayName);
    }
    if (userBio) {
      formData.append("bio", userBio);
    }

    dispatch(editMyProfileAsync(formData));
  };

  useEffect(() => {
    dispatch(getMyProfileAsync());
  }, [dispatch]);

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
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div style={{ color: "#66C0F4" }}>
          <Row>
            <Col sm={3}>
              <p className="fs-1">{display_name}</p>
              <div className="d-flex justify-content-center">
                <img className="img-fluid img-thumbnail" src={avatar} />
              </div>
            </Col>
            <Col sm={7}>
              <div style={{ wordWrap: "break-word", color: "#C7D5E0" }}>
                {" "}
                <p className="fs-4">Bio:</p> {bio}
              </div>
              <br />
              <div>
                Games:{" "}
                {games_bought.map((game, i) => (
                  <div>{game}</div>
                ))}
              </div>{" "}
              <br />
            </Col>
            <Col sm={2}>
              <Button variant="primary" onClick={handleShow}>
                Edit Profile
              </Button>
            </Col>
          </Row>
          <br />
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="avatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                placeholder="Change profile picture"
                onChange={handleAvatarChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="displayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new display name"
                onChange={handleDisplayNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write your new bio here"
                onChange={handleBioChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProfile;
