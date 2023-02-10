import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getProfileAsync } from '../../Reducers/communitySlice'


const Community = () => {
  const dispatch = useAppDispatch()
  const { number } = useParams()

  useEffect(() => {
    if (number != undefined) {
      dispatch(getProfileAsync(number))
    }
  }, [dispatch])


  const { display_name, avatar, bio, games } = useAppSelector((state) => state.community)


  return (
    <div>
      <div style={{ color: "#66C0F4" }}>
        {display_name}
        {avatar}
        {bio}
        {games.map((game) => <div>{game.game_name}</div>)}
      </div>
    </div>
  )
}

export default Community