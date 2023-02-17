import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from './app/hooks';
import  "./css/Shop.css";
import { getAllProfilesAsync, selectCurrentPage, selectProfileSearch, updateCurrentPage } from './Reducers/communitySlice';
import { selectCount } from './Reducers/communitySlice';




export default function BasicPaginationCommunity() {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const currentPage = useAppSelector(selectCurrentPage)
    const searchProfile = useAppSelector(selectProfileSearch)


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(updateCurrentPage(value))
        dispatch(getAllProfilesAsync({ pageNumber: value, searchQuery: searchProfile}))
      }


    return (
    <Stack spacing={2}>
      <Pagination className='center' count={Math.ceil(count/12)} page={currentPage} color="primary" style={{color: "#66C0F4", paddingTop: "3rem"}} onChange={handleChange} />
    </Stack>
  );
}
