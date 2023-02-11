import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getProfileAsync } from '../../Reducers/communitySlice'


const Profile = () => {
  const dispatch = useAppDispatch()
  const { number } = useParams()

  useEffect(() => {
    if (number != undefined) {
      dispatch(getProfileAsync(number))
    }
  }, [dispatch])
  console.log("PROFILE")
  const { display_name, avatar, bio, games_bought } = useAppSelector((state) => state.community)

  return (
    <div>
      <div style={{ color: "#66C0F4" }}>
        {display_name} <br />
        {avatar} <br />
        {bio}
        {/* {games_bought.map((game) => <div>Games: {game}</div>)} */}
      </div>
    </div>
  )
}

export default Profile