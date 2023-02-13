import react, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getGamesAsync, selectCount } from './Reducers/shopSlice';


export default function BasicPagination() {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const [page, setPage] = useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        dispatch(getGamesAsync({ page: value, searchQuery: "" }))
      }
    
    return (
    <Stack spacing={2}>
      <Pagination  count={Math.ceil(count/5)} color="primary" style={{color: "#66C0F4"}} onChange={handleChange} />
    </Stack>
  );
}
