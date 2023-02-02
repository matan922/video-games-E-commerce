import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getProfileAsync } from './communitySlice'


const Community = () => {
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getProfileAsync())
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(editProfileAsync())
  // }, [dispatch])
  
  
  const {displayName, avatar, bio, games} = useAppSelector((state) => state.community)


  return (
    <div>
        {displayName}
        {avatar}
        {bio}
        {games}
    </div>
  )
}

export default Community