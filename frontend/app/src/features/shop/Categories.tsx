import React, { useEffect } from 'react'
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCategoriesAsync, selectCategories } from '../../Reducers/categoriesSlice'
import { getGamesAsync, selectCurrentPage, selectGenreSort, selectSearchGame, updateGenreSort } from '../../Reducers/shopSlice'
import "../../css/Shop.css"

const Categories = () => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(selectCategories)
    const searchGame = useAppSelector(selectSearchGame)
    const genreSort = useAppSelector(selectGenreSort)

    useEffect(() => {
        dispatch(getCategoriesAsync())
    }, [dispatch])



    return (
        <div style={{ fontSize: "14px", color: "#1B2838" }}>
            <Container>
                <div className="d-flex d-md-none justify-content-end">
                    <Form.Select
                        className="me-2"
                        onChange={(e) => dispatch(updateGenreSort(e.target.value))}
                    >
                        {categories.map((category) =>
                            <option value={category.genre_name}>
                                {category.genre_name}
                            </option>
                        )}
                        <option value="">Stop Sorting</option>
                    </Form.Select>
                </div>
                <ListGroup className="d-none d-md-block">
                    {categories.map((category) =>
                        <ListGroupItem>
                            <Row>
                                <Col xs={6} className="mt-2">
                                    <Form.Check
                                        className='custom-control-input'
                                        onChange={(e) => dispatch(updateGenreSort(e.target.value))}
                                        value={category.genre_name}
                                        name={"genres"}
                                        type={"radio"}
                                        label={category.genre_name}
                                        style={{ display: "inline-block", paddingRight: "1rem", color: "#66C0F4" }}
                                        aria-label="radio 1"
                                    />
                                    <br />
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}
                    <ListGroupItem>
                        <Form.Check
                            className="mt-2"
                            label="Stop Sorting"
                            type="radio"
                            name='genres'
                            style={{ color: "#66C0F4" }}
                            onClick={() => dispatch(updateGenreSort(""))}
                        />
                    </ListGroupItem>
                </ListGroup>
            </Container>
        </div>
    )
}

export default Categories

