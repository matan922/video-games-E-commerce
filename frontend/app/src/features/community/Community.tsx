import React, { useEffect } from 'react'
import { Button, Card, Container, Form, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getAllProfilesAsync, selectCurrentPage, selectIsLoadingProf, selectProfiles, updateProfileSearch } from '../../Reducers/communitySlice'
import '../../css/Community.css'
import Spinner from '../../Spinner'
import BasicPaginationCommunity from '../../BasicPaginationCommunity'



const Community = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isLoading, profileSearch, profiles, currentPage } = useAppSelector((state) => state.community)


    useEffect(() => {
        dispatch(getAllProfilesAsync({ searchQuery: profileSearch, pageNumber: currentPage }))
    }, [dispatch])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(getAllProfilesAsync({ searchQuery: profileSearch, pageNumber: currentPage }))
    };

    

    return (
        <div>
            {isLoading ? <Spinner></Spinner> :
                <div>
                    <Navbar expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Form className="d-flex" onSubmit={handleSearch}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    value={profileSearch}
                                    onChange={(e) => dispatch(updateProfileSearch(e.target.value))}
                                    aria-label="Search"
                                />
                                <Button type="submit" variant="outline-success">Search</Button>
                            </Form>
                        </Container>
                    </Navbar>
                    <br />
                    <div style={{ color: "#66C0F4" }}>
                        {profiles.map((profile, i) =>
                            <Card className="stretched-link mb-4 card-community" onClick={() => navigate("profile/" + profile.id + "/")} style={{ backgroundColor: "#1B2838" }}>
                                <Card.Body>
                                    <Card.Text>
                                        <div key={i}>
                                            <img style={{ width: "70px", height: "73px" }} src={profile?.avatar} alt='placeholder.png' /><span className='ps-4 fs-3'>{profile?.display_name}</span>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                    <BasicPaginationCommunity></BasicPaginationCommunity>
                </div>
            }
        </div>
    )
}

export default Community