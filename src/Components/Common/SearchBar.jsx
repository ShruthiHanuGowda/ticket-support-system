import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/system';
import { Button, IconButton, InputAdornment, InputBase } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'

//--------- for Search bar ------

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F4FBFF',
  '&:hover': {
    backgroundColor: '#F4FBFF',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  menuPaper: {
    backgroundColor: 'lightblue',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions?.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}))

//----------- end search Bar



const SearchBar = ({ onClick, clearSearch }) => {
  const [searched, setSearched] = React.useState('');




  // const requestSearch = (e) => {

  //   if (e.target.value == '') {
  //     setData(rows);
  //     setSearched('');
  //   } else {
  //     setSearched(e.target.value)
  //     console.log(rows)
  //     // let searchedVal = e.target.value
  //     const filteredRows = rows.filter((row) => {
  //       return (
  //         row.name?.toLowerCase().includes(searched.toLowerCase()) ||
  //         row.srno?.toLowerCase().includes(searched.toLowerCase()) ||
  //         row.fat?.toLowerCase().includes(searched.toLowerCase())

  //       )
  //       console.log(filteredRows);
  //     })
  //     setData(filteredRows)
  //   }

  // }

  const searchValue = () => {
    let searchValueData = searched
    // console.log(searchValueData)
  }
 
  return (
    <Search sx={{ '& .MuiInputBase-root': { width: '100%' } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        type='text'
        onChange={(e) => { setSearched(e.target.value) }}
        placeholder="Search by ID, Department"
        inputProps={{ 'aria-label': 'search' }}
        value={searched}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => { clearSearch(setSearched) }}>
              {!searched ? (
                " "
              ) : (
                <ClearOutlinedIcon />
              )}
            </IconButton>

            {!searched ? (
              " "
            ) : (
              <Button variant='outlined' onClick={() => {
                onClick(searched);
                searchValue();
              }} style={{ color: '#000', backgroundColor: '#044BA940' }}>Search</Button>

            )}


          </InputAdornment>
        }
      />
    </Search >
  )
}
export default SearchBar;