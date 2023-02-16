import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getProfileAsync } from '../../Reducers/communitySlice'
import Spinner from '../../Spinner'


const Profile = () => {
  const dispatch = useAppDispatch()
  const { number } = useParams()
  const { isLoading } = useAppSelector((state) => state.community)


  useEffect(() => {
    if (number != undefined) {
      dispatch(getProfileAsync(number))
    }
  }, [dispatch])
  console.log("PROFILE")
  const { display_name, avatar, bio, games_bought } = useAppSelector((state) => state.community)

  return (
    <div >
      {
        isLoading ? <Spinner></Spinner> :
          <div style={{ color: "#66C0F4" }}>
            <Row>

              <Col sm={3}>
                <p className="fs-1">{display_name}</p>
                <img style={{ height: "184px", width: "184px" }} src={avatar} />
              </Col>
              <Col sm={9}>
                <div style={{ wordWrap: "break-word", color: "#C7D5E0" }}> <p className='fs-4' >Bio:</p> {bio}</div>
                <br />
                <div>Games: {games_bought.map((game, i) => <Link to={"/shop/game/"}><br />{game}</Link>)}</div> <br />
              </Col>
            </Row>
            <br />
          </div>
      }
    </div>
  )
}

export default Profile