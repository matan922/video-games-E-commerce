import react, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getGamesAsync, selectCount, selectCurrentPage, selectGenreSort, selectSearchGame, updateCurrentPage } from './Reducers/shopSlice';
import  "./css/Shop.css";


export default function BasicPagination() {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const currentPage = useAppSelector(selectCurrentPage)
    const searchGame = useAppSelector(selectSearchGame)
    const genreSort = useAppSelector(selectGenreSort)


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updateCurrentPage(value))
        dispatch(getGamesAsync({ page: value, searchQuery: searchGame, sortQuery: genreSort }))
      }


    return (
    <Stack spacing={2}>
      <Pagination className='center' count={Math.ceil(count/12)} page={currentPage} color="primary" style={{color: "#66C0F4", paddingTop: "3rem"}} onChange={handleChange} />
    </Stack>
  );
}
