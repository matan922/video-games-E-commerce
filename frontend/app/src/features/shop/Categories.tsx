import React, { useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCategoriesAsync, selectCategories } from '../../Reducers/categoriesSlice'

const Categories = () => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(selectCategories)

    // console.log(categories.map((genre) => genre.genre_name))

    useEffect(() => {
        dispatch(getCategoriesAsync())
    }, [dispatch])



    return (
        <div style={{ color: "#66C0F4" }}>
            <Row>
                {categories.map((category) =>
                    <Col xs={6}>
                        <Form.Check style={{ display: "inline-block", paddingRight: "1rem" }} aria-label="option 1" />
                        {category.genre_name}
                        <br />
                    </Col>)}
            </Row>
        </div>
    )
}

export default Categories