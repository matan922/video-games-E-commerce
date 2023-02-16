import { AsyncThunk } from '@reduxjs/toolkit/dist/createAsyncThunk';
import React, { useState } from 'react'
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';


const SearchComponent = ({ asyncThunk }: { asyncThunk: AsyncThunk<any, any, any> }) => {
  const dispatch = useAppDispatch()
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let searchQuery = searchText;
    dispatch(asyncThunk(searchQuery))
  };

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Search"
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>

    </div>
  )
}

export default SearchComponent