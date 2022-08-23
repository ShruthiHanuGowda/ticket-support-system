import * as React from 'react'
import {
  Button,
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {useNavigate ,Link} from 'react-router-dom'
//--------- for Search bar ------

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F4FBFF",
  "&:hover": {
    backgroundColor: "#F4FBFF",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  menuPaper: {
    backgroundColor: "lightblue",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));
//----------- end search Bar
// const CheckboxFiled = styled(FormControlLabel)({
//   marginRight: '30px',

//   color: '#777777',
// })

// const useStyle = styled({

// })

function createData(sr, name, position, Department) {
  return { sr, name, position, Department };
}

const rows = [
  createData("1", "John Doe", "Sales Executive", "Sales"),
  createData("2", "John Doe", "Manager", "Sales"),
  createData("3", "John Doe", "Marketing", "Sales"),
  createData("4", "John Doe", "Sales Executive", "Sales"),
  createData("5", "John Doe", "Sales Executive", "Sales"),
  createData("6", "John Doe", "Sales Executive", "Sales"),
  createData("7", "John Doe", "Sales Executive", "Sales"),
];

export const ManageUser = ({loggedin}) => {
  // ------for openAction in table Row---
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate =useNavigate();

  React.useEffect(() => {   
    if(!loggedin){
      navigate('/login');
    }
    }, [loggedin])
    
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const statusColors = {
    "Sales Executive": "#044BA9",
    Manager: "#E05D5D",
    Marketing: "#0B9611",
  };
  return (
    <Box>
      <Grid container justifyContent={"space-between"}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Manage End User
          </Typography>
        </Grid>
        <Grid item xm={10} md={6} lg={6}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by ID, Department"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid item xm={12} sm={12} md={3} lg={3} textAlign="right">
          <Button
            variant="contained"
            component={Link}
            to="../manage-user/create-enduser"
            style={{ backgroundColor: "blue" }}
          >
            <AddCircleOutlineIcon />
            &nbsp; Add User
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ marginBottom: "0px", marginTop: "20px" }} />
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "separate",
            borderSpacing: "0px 10px",
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
              padding: "6px",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className="th" align="center">
                S.No.
              </TableCell>
              <TableCell className="th" align="center">
                NAME
              </TableCell>
              <TableCell className="th" align="center">
                POSITION
              </TableCell>
              <TableCell className="th" align="center">
                DEPARTMENT
              </TableCell>
              <TableCell className="th" align="center">
                ACTION
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className="tableRow"
                key={row.sr}
                style={{ background: "#F4FBFF" }}
              >
                <TableCell component="th" align="center" scope="row">
                  {row.sr}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>

                <TableCell
                  align="center"
                  sx={{
                    color: statusColors[row.position] ?? 'black',                  
                  }}
                >
                  {row.position}
                </TableCell>
                <TableCell align="center">{row.Department}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EditOutlinedIcon sx={{ color: "#777777" }} />
                  </IconButton>
                  <IconButton>
                    <DeleteOutlineOutlinedIcon sx={{ color: " #E05D5D" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
