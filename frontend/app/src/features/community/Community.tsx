import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getAllProfilesAsync, searchProfilesAsync, selectProfiles } from '../../Reducers/communitySlice'
import '../../css/Community.css'


const Community = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllProfilesAsync())
    }, [dispatch])


    const profiles = useAppSelector(selectProfiles)
    console.log(profiles)


    return (

        <div style={{ color: "#66C0F4" }}>
            {profiles.map((profile, i) =>
                <Card className="stretched-link mb-4 card-community" onClick={() => navigate("profile/" + profile.id + "/")} style={{ backgroundColor: "#1B2838" }}>
                    <Card.Body>
                        <Card.Text>
                            <div key={i}>
                                <img style={{ width: "70px", height: "73px" }} src={profile.avatar} alt='placeholder.png' /><span className='ps-4 fs-3'>{profile.display_name}</span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}

export default Community