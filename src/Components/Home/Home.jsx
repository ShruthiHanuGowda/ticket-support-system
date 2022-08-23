import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
// import { makeStyles } from '@material-ui/core/styles';

import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'



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
   display:'none',
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
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}))
//----------- end search Bar
const CheckboxFiled = styled(FormControlLabel)({
  marginRight: '30px',

  color: '#777777',
})

// const useStyle = styled({

// })

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Open'),
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Hold'),
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Progress'),
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Closed'),
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Open'),
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Open'),
  createData('#2345', 'Sales', 'John Doe', 'Sales Executive', 'Open'),
]

export const Home = () => {
  // ------for openAction in table Row---
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const statusColors = {
    Open: '#0B9611',
    Hold: '#E05D5D',
    Progress: '#FFB344',
    Closed: '#777777',
  }
  return (
    // eslint-disable-next-line no-undef
    <Box>
      <Typography sx={{ fontSize: '18px', color: '#3B3B3B' }}>
        Welcome Client,
      </Typography>
      <Grid container justifyContent={'space-between'}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xm={10} md={6} lg={6}>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by ID, Department"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
        </Grid>
        <Grid item xm={12} sm={12} md={3} lg={3} textAlign="right">
        <Button variant="contained" component={Link} to="../manage-user/create-enduser"  style={{ backgroundColor: 'blue' }} >
            <AddCircleOutlineIcon />
            &nbsp; Add New User
          </Button>
        </Grid>
      </Grid>
      <Grid container marginTop={3}>
        <Grid item xs={12}  md={10}  component={FormGroup}>
          <CheckboxFiled
            control={<Checkbox color="default" defaultChecked />}
            label="ALL"
          />
          <CheckboxFiled control={<Checkbox color="default" />} label="OPEN" />
          <CheckboxFiled control={<Checkbox color="default" />} label="HOLD" />
          <CheckboxFiled
            control={<Checkbox color="default" />}
            label="CLOSED"
          />
          <CheckboxFiled
            control={<Checkbox color="default" />}
            label="IN PROGRESS"
          />
        </Grid>
        <Grid item xs={12} md={2} textAlign="right">
          <Button
            variant="outlined"
            sx={{
              background: ' #044BA940',
              border: '1px solid #044BA9',
              color: '#044BA9',
              textTransform: 'capitalize',
            }}
          >
            <FilterAltOffSharpIcon />
            &nbsp; Filters
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: '0px', marginTop: '20px' }} />
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: 'separate',
            borderSpacing: '0px 10px',
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
              padding: '6px',
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className="th" align="center">
                TICKET #
              </TableCell>
              <TableCell className="th" align="center">
                DEPARTMENT
              </TableCell>
              <TableCell className="th" align="center">
                ASSIGNEE NAME
              </TableCell>
              <TableCell className="th" align="center">
                ASSIGNEE DEPARTMENT
              </TableCell>
              <TableCell className="th" align="center">
                STATUS
              </TableCell>
              <TableCell className="th" align="center">
                ACTION
              </TableCell>
            </TableRow>
            <TableRow>
          </TableRow>
          </TableHead>       
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className="tableRow"
                key={row.name}
                style={{ background: '#F4FBFF' }}
              >
                <TableCell component="th" align="center" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: statusColors[row.protein] ?? 'black',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                >
                  {row.protein}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Action">
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon sx={{ color: '#777777' }} />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    id="basic-menu"
                   sx={{"& .MuiPaper-root": {
                    backgroundColor: "#C0D2E9",
                    boxShadow:'none',   
                    width:'100px'       
                  },
                  "& .MuiList-root":{
                    padding:'0'
                  },
                    "& .MuiMenuItem-root":{
                      padding:"5px 10px ",
                    fontSize:"13px",
                    justifyContent:'space-between'
                    }}}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem  onClick={handleClose} component={Link} to="/ticket-details"  >Views <RemoveRedEyeIcon fontSize='14px'/></MenuItem>
                    <MenuItem  onClick={handleClose}>Edit<EditIcon fontSize='14px'/></MenuItem>
                    <MenuItem onClick={handleClose}>Transfer<CompareArrowsIcon fontSize='14px'/></MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}


