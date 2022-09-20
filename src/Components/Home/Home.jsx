import * as React from "react";
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputBase, Menu, MenuItem, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import { makeStyles } from '@material-ui/core/styles';

import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOffSharpIcon from "@mui/icons-material/FilterAltOffSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../Common/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { NotFoundImage } from "../Common/NotFoundImage";

const CheckboxFiled = styled(FormControlLabel)({
  marginRight: "30px",
  color: "#777777",
});

function createData(srno, department, name, position, status) {
  return { srno, department, name, position, status };
}

let serText = ''
export const Home = () => {
  const navigate = useNavigate();
  //----------------for CheckBox Functionlity
  const [options, setOptions] = useState([
    { label: "All", id: 0 },
    { label: "Open", id: 1 },
    { label: "Close", id: 2 },
    { label: "Hold", id: 3 },
    { label: "In Progress", id: 4 },
  ]);

  let [selectedOptions, setSelectedOptions] = useState([]);
  let [data, setData] = React.useState([]);
  //  console.log(data);
  useEffect(() => {
    fecthTicketData(serText);
  }, []);
  const fecthTicketData = async (searchStr) => {
    // data = [];
    console.log("filterValue received :", searchStr);
    const { data } = await axios.post(`/getDataByFilter`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      flags: selectedOptions,
      searchString: searchStr
    });
    console.log("data from api", data.data);
    console.log(data.message);
    setData(data.data);

    // .then((res)=> console.log(res.data.data));
  };
  //--------------------------------------------------------------------
  const onCheckBoxFillter = (filterValue) => {
    console.log(filterValue);
    if (selectedOptions.includes(filterValue)) {
      const indexx = selectedOptions.indexOf(filterValue);
      if (indexx > -1) {
        selectedOptions.splice(indexx, 1);
      }
      // console.log('exists')
    } else {
      console.log("not exists");

      // setSelectedOptions((prevState) => [...prevState, filterValue]);
      selectedOptions.push(filterValue);
    }
    console.log("selectedOptions", selectedOptions);
    fecthTicketData(serText);
  };
  // ------for openAction in table Row---
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [SingleData, setSingleData] = React.useState(null);
  console.log(SingleData)
  const open = Boolean(anchorEl);
  const handleClick = (event, row) => {
    console.log(row)
    setAnchorEl(event.currentTarget);
    setSingleData(row);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //--------api call for searching user using search bar---------
  const handleSearch = async (searchText) => {
    await axios
      .get(`/search/${searchText}`)
      .then((res) => {
        data = []
        console.log('response received', res.data.result)
        setData([...res.data.result]);
      })
      .catch((err) => {
        console.log("errror", err);
      });
    console.log("ASDFG", searchText);
  };

  const statusColors = {
    Open: "#0B9611",
    Hold: "#E05D5D",
    "In Progress": "#FFB344",
    Close: "#777777",
  };
  return (
    <Box>
      <Typography sx={{ fontSize: "18px", color: "#3B3B3B" }}>Welcome {JSON.parse(sessionStorage.getItem("userData")).role === "admin" ? "Admin" : "Client"},</Typography>
      <Grid container justifyContent={"space-between"}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xm={10} md={6} lg={6}>
          <SearchBar
            onClick={(seach) => {
              serText = seach;
              // handleSearch(serText);
              fecthTicketData(serText);
            }}
            clearSearch={(setSearched) => {
              serText = '';
              setSearched('')
              fecthTicketData(serText)
            }}
          />
        </Grid>
        <Grid item xm={12} sm={12} md={3} lg={3} textAlign="right">
          <Button
            variant="contained"
            component={Link}
            to="../manage-user/create-enduser"
            sx={{
              backgroundColor: "blue",
              "&:hover": {
                color: "white",
              },
            }}
          >
            <AddCircleOutlineIcon style={{ color: "white" }} />
            &nbsp;Add New User
          </Button>
        </Grid>
      </Grid>
      <Grid container marginTop={3}>
        <Grid item xs={12} md={10} component={FormGroup}>
          {options.map((item, index) => {
            return <CheckboxFiled control={<Checkbox color="default" defaultChecked={false} onClick={() => onCheckBoxFillter(item.id)} />} label={item.label} key={item.id} />;
          })}
        </Grid>
        <Grid item xs={12} md={2} textAlign="right">
          <Button
            variant="outlined"
            sx={{
              background: " #044BA940",
              border: "1px solid #044BA9",
              color: "#044BA9",
              textTransform: "capitalize",
            }}
          >
            <FilterAltOffSharpIcon />
            &nbsp; Filters
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
              <TableRow></TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow className="tableRow" key={index} style={{ background: "#F4FBFF" }}>
                  <TableCell component="th" align="center" scope="row">
                    {index + 1001}
                  </TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: statusColors[row.status] ?? "black",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {row.status}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Action">
                      <IconButton onClick={(e) => handleClick(e, row)}>
                        <MoreVertIcon sx={{ color: "#777777" }} />
                      </IconButton>
                    </Tooltip>

                    <Menu
                      id="basic-menu"
                      sx={{
                        "& .MuiPaper-root": {
                          backgroundColor: "#C0D2E9",
                          boxShadow: "none",
                          width: "100px",
                        },
                        "& .MuiList-root": {
                          padding: "0",
                        },
                        "& .MuiMenuItem-root": {
                          padding: "5px 10px ",
                          fontSize: "13px",
                          justifyContent: "space-between",
                        },
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      SingleData={SingleData}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose} component={Link}
                        to={`/ticket-details/${SingleData?._id}`}>
                        Views <RemoveRedEyeIcon fontSize="14px" />
                      </MenuItem>
                      <MenuItem onClick={handleClose} component={Link}
                        to={`/ticket-details/${SingleData?._id}`}>
                        Edit
                        <EditIcon fontSize="14px" />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        Transfer
                        <CompareArrowsIcon fontSize="14px" />
                      </MenuItem>
                    </Menu>
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
