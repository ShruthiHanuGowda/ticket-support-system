import * as React from "react";
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("#2345", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#2345", "Sales", "John Doe", "Sales Executive", "Hold"),
  createData("#2345", "Sales", "John Doe", "Sales Executive", "Progress"),
  createData("#2346", "Sales", "John Doe", "Sales Executive", "Closed"),
  createData("#2345", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#2345", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#2345", "Sales", "John Doe", "Sales Executive", "Open"),
];

export const ManageClient = () => {
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
  return (
    <Box>
      <Grid container justifyContent={"space-between"}>
        <Grid item xm={2} md={3} lg={3}>
          <Typography variant="h5" letterSpacing={1}>
            Manage Client
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
            to="../manage-client/create-client"
            style={{ backgroundColor: "blue" }}
          >
             <AddCircleOutlineIcon style={{ color: "white" }} />
            &nbsp;<h8 style={{ color: "white" }}>Add New User</h8>
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
                PERMISSION
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
                key={row.name}
                style={{ background: "#F4FBFF" }}
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
                    color: statusColors[row.protein] ?? "black",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {row.protein}
                </TableCell>
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