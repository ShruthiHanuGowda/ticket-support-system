import * as React from "react";
import { Button, Divider, FormControlLabel, Grid, IconButton, InputBase, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../Common/SearchBar";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { NotFoundImage } from "../Common/NotFoundImage";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("123", "Sales", "bharat", "Sales Executive", "Open"), createData("#2315", "Sales", "John Doe", "Sales Executive", "Hold"), createData("#2312045", "Sales", "John Doe", "Sales Executive", "Progress"), createData("#232145", "Sales", "John Doe", "Sales Executive", "Closed"), createData("#2311245", "Sales", "John Doe", "Sales Executive", "Open"), createData("#231245", "Sales", "John Doe", "Sales Executive", "Open"), createData("#2312145", "Sales", "John Doe", "Sales Executive", "Open")];
let serText = ''
export const ManageClient = ({ loggedin, isClient }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [usersData, setUserData] = useState([]);
  const [data, setData] = useState(usersData);
  useEffect(() => {
    console.log(data)
    //---- for Toster
    console.count("useEffect called");
    if (location.state) {
      console.log("location::", location);
      console.log(location.state);
      toast.success(location.state.message);
      location.state = null;
    }
    fecthUserData(serText);
  }, []);

  const fecthUserData = async (serText) => {
    const Role = "client";
    const { data } = await axios.get(`/getUser/${Role}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`, 'searchString': serText } });
    console.log(data);
    if (data.status == 'failed') {
      navigate("/", { state: { message: data.message, status: "400" } })
    }
    console.log(data.data);
    setUserData(data.data);
    setData(data.data);
    // .then((res)=> console.log(res.data.data));
  };
  // ------for openAction in table Row---
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const statusColors = {
    Open: "#0B9611",
    Hold: "#E05D5D",
    Progress: "#FFB344",
    Closed: "#777777",
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(`/user/${id}`);
    toast.success(response.data.message)
    setUserData([]);
    fecthUserData();
    // window.location.reload(false);
    //navigate("#")
  };

  const editUser = (id) => {
    navigate(`/manage-client/create-client/${id}`);
    // await axios.post(`http://localhost:8000/user/${id}`).then((res)=>console.log(res))
  };
  return (
    <Box>
      <Grid container justifyContent={"space-between"}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Manage Client
          </Typography>
        </Grid>
        <Grid item xm={10} md={6} lg={6}>
          <SearchBar

            onClick={(seach) => {
              serText = seach;
              // handleSearch(serText);
              fecthUserData(serText);

            }}
            clearSearch={(setSearched) => {
              serText = '';
              setSearched('')
              fecthUserData(serText)
            }}
          />        </Grid>
        <Grid item xm={12} sm={12} md={3} lg={3} textAlign="right">
          <Button
            variant="contained"
            component={Link}
            to="../manage-client/create-client"
            sx={{
              backgroundColor: "blue",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <AddCircleOutlineIcon style={{ color: "white" }} />
            &nbsp;Add Client
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ marginBottom: "0px", marginTop: "20px" }} />
      <TableContainer>
        {data && data.length != 0 ?
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
                  PERMISSION
                </TableCell>
                <TableCell className="th" align="center">
                  ACTION
                </TableCell>
              </TableRow>
              <TableRow></TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow className="tableRow" key={row._id} style={{ background: "#F4FBFF" }}>
                  <TableCell component="th" align="center" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.position}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell
                    align="center">
                    {row.email}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        editUser(row._id);
                      }}
                    >
                      <EditOutlinedIcon sx={{ color: "#777777" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteUser(row._id);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon sx={{ color: " #E05D5D" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          : <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', }}><NotFoundImage /></div>}

      </TableContainer>
    </Box>
  );
};
