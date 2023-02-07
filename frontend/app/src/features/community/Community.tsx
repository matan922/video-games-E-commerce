import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import SearchComponent from '../navbar/SearchComponent'
import { getAllProfilesAsync, searchProfilesAsync, selectProfiles } from '../../Reducers/communitySlice'



const Community = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllProfilesAsync())
    }, [dispatch])


    const profiles = useAppSelector(selectProfiles)



    return (
        <div>
            <SearchComponent asyncThunk={searchProfilesAsync} />
            {profiles.map((profile, i) => <div key={i}>
                ID: {profile.id} ,{profile.bio} user ID: {profile.user} <Button variant="info" onClick={() => navigate("profile/" + profile.id + "/")}>Profile </Button>
            </div>)}
        </div>
    )
}

export default Community