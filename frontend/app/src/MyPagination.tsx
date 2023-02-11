import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getGamesAsync, selectCount } from './Reducers/shopSlice';



export default function MyPagination() {
  const [page, setPage] = React.useState<number>(1);
  const [offsetPage, setOffsetPage] = React.useState(0)
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setOffsetPage(value)

    const searchQuery = ""
    dispatch(getGamesAsync({ offset: value * 10, searchQuery: searchQuery }))
 
  };

  //   React.useEffect(() => {
  //     const searchQuery = ""
  //     dispatch(getGamesAsync({ offset: offsetPage, searchQuery: searchQuery }))
  // }, [count]);


  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={Math.floor(count/10)} page={page} onChange={handleChange} />
    </Stack>
  );
}