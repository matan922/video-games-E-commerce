import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import {  selectGamesPerPage, selectTotalGames } from './Reducers/shopSlice'
// selectCurrentPage
const Pagination = ({gamesPerPage, totalGames} : any) => {
    // const gamesPerPage = useAppSelector(selectGamesPerPage)
    // const totalGames = useAppSelector(selectTotalGames)
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }


  return (
    <Nav.Link>
        <ul className="pagination">
            {pageNumbers.map((number) => <li key={number} className="page-item">
                <Link to={"/"} className="page-link">
                    {number}
                </Link>
            </li>)}
        </ul>
    </Nav.Link>
  )
}

export default Pagination