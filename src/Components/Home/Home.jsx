import * as React from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
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
// import { makeStyles } from '@material-ui/core/styles';

import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltOffSharpIcon from "@mui/icons-material/FilterAltOffSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, Link, Navigate } from "react-router-dom";
import SearchBar from "../Common/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckboxFiled = styled(FormControlLabel)({
  marginRight: "30px",
  color: "#777777",
});

function createData(srno, department, name, position, status) {
  return { srno, department, name, position, status };
}

const rows = [
  createData("1", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#2", "Sales", "bharat Doe", "Sales Executive", "Hold"),
  createData("#22345", "Sales", "rahul Doe", "Sales Executive", "Progress"),
  createData("#23145", "Sales", "John Doe", "Sales Executive", "Closed"),
  createData("#1435", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#24345", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#23545", "Sales", "John Doe", "Sales Executive", "Open"),
];

export const Home = () => {
  const navigate = useNavigate();
  //----------------for CheckBox Functionlity
  const [options, setOptions] = useState([
    { label: "All"},
    { label: "Open" },
    { label: "Close" },
    { label: "Hold" },
    { label: "In Progress" },
  ]);
  let [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = React.useState(rows);
  //  console.log(data);
  useEffect(() => {
    fecthUserData([]);
  }, []);
  // const fecthUserData = async (filterValue) => {
  //   console.log('filterValue received :', filterValue)
  //   const { data } = await axios.post(`/getDataByFilter`, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`
  //     },
  //     flags: filterValue
  //   });
  //   console.log('data from api', data.data)
  //   setData(data.data);

  //   // .then((res)=> console.log(res.data.data));
  // };

  const fecthUserData = async () => {
    const getTicketData = await axios.get("/getTicket");
    console.log(getTicketData);
    setData(getTicketData.data.data);
  };
  //--------------------------------------------------------------------
  const onCheckBoxFillter = (filterValue) => {
    // console.log(filterValue, "array:::", selectedOptions);
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
    fecthUserData(selectedOptions);
  };
  // ------for openAction in table Row---
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [SingleData, setSingleData] = React.useState(null);

  const open = Boolean(anchorEl);
  console.log(anchorEl);
  const handleClick = (e, row) => {
    console.log(e.currentTarget);
    console.log(row);
    setAnchorEl(e.currentTarget);
    setSingleData(row);
  };
  const handleClose = () => {
    setAnchorEl(null);
    Navigate(`/create-ticket `);
  };
  const statusColors = {
    open: "#0B9611",
    Hold: "#E05D5D",
    Progress: "#FFB344",
    Closed: "#777777",
  };
  return (
    <Box>
      <Typography sx={{ fontSize: "18px", color: "#3B3B3B" }}>
        Welcome{" "}
        {JSON.parse(sessionStorage.getItem("userData")).role === "admin"
          ? "Admin"
          : "Client"}
        ,
      </Typography>
      <Grid container justifyContent={"space-between"}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xm={10} md={6} lg={6}>
          <SearchBar rows={rows} setData={setData} />
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
            return (
              <CheckboxFiled
                control={
                  <Checkbox
                    color="default"
                    defaultChecked={false}
                    onClick={() => onCheckBoxFillter(item.id)}
                  />
                }
                label={item.label}
                key={item.id}
              />
            );
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
              <TableRow
                className="tableRow"
                key={index}
                style={{ background: "#F4FBFF" }}
              >
                <TableCell component="th" align="center" scope="row">
                  {index + 1001}
                </TableCell>
                <TableCell align="center">{row.department}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                {/* <TableCell align="center">{row.issuetype}</TableCell> */}
                <TableCell align="center">{row.issuetype}</TableCell>
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
                    SingleData={SingleData}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to={`/ticket-details/${SingleData?._id}`}

                    >
                      Views <RemoveRedEyeIcon fontSize="14px" />
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                     to={`/ticket-details/${SingleData?._id}`}
                    >
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
      </TableContainer>
    </Box>
  );
};
