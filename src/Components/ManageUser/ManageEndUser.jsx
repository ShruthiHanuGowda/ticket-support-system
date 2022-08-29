import * as React from "react";
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
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
// import { makeStyles } from '@material-ui/core/styles';

import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOffSharpIcon from "@mui/icons-material/FilterAltOffSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../Common/SearchBar";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";

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

export const ManageUser = ({ loggedin }) => {
  // ------for openAction in table Row---
  const [usersData, setUserData] = useState([]);
  console.log(usersData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState(usersData); 
  console.log(data)
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log(data);
    if (!loggedin) {
      navigate("/login");
    }
    if (location.state) {
      if (location.state.status == "201") {
        toast.success(location.state.message);
      } else toast.error(location.state.message);
    }
    fecthUserData();
  }, [loggedin]);

  const fecthUserData = async () => {
    const userData = await axios.get("http://localhost:8000/user");
    // console.log(userData.data.data);
    setUserData(userData.data.data);
    
    
    // .then((res)=> console.log(res.data.data));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const statusColors = {
    "Head of Product": "#044BA9",
    "Product Manager": "#E05D5D",
    "VP of Marketing": "#0B9611",
    "Technical Lead":"#0392cf",
    "Senior Software Engineer":"#ffeead",
    "Software Developer":"#a8e6cf ",
    "Junior Software Developer":"#76b4bd",
    "Intern Software Developer":"#603601"

  };
  return (
    <Box>
      <Toaster />
      <Grid container justifyContent={"space-between"}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Manage End User
          </Typography>
        </Grid>
        <Grid item xm={10} md={6} lg={6}>
          <SearchBar rows={usersData} setData={setData} />
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
          </TableHead>
          <TableBody>
             
              { data.length == 0 ? usersData.map((row, index) => (
                  <TableRow
                    className="tableRow"
                    key={row._id}
                    style={{ background: "#F4FBFF" }}
                  >
                    <TableCell component="th" align="center" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" sx={{textTransform: 'capitalize'}}>{row.name}</TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: statusColors[row.position] ?? "black",
                      }}
                    >
                      {row.position}
                    </TableCell>
                    <TableCell align="center">{row.department}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <EditOutlinedIcon sx={{ color: "#777777" }} />
                      </IconButton>
                      <IconButton>
                        <DeleteOutlineOutlinedIcon sx={{ color: " #E05D5D" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : data.map((row, index) => (
                <TableRow
                  className="tableRow"
                  key={row._id}
                  style={{ background: "#F4FBFF" }}
                >
                  <TableCell component="th" align="center" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      color: statusColors[row.position] ?? "black",
                    }}
                  >
                    {row.position}
                  </TableCell>
                  <TableCell align="center">{row.department}</TableCell>
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
