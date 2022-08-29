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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate,Link } from "react-router-dom";
import SearchBar from "../Common/SearchBar";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("123", "Sales", "bharat", "Sales Executive", "Open"),
  createData("#2315", "Sales", "John Doe", "Sales Executive", "Hold"),
  createData("#2312045", "Sales", "John Doe", "Sales Executive", "Progress"),
  createData("#232145", "Sales", "John Doe", "Sales Executive", "Closed"),
  createData("#2311245", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#231245", "Sales", "John Doe", "Sales Executive", "Open"),
  createData("#2312145", "Sales", "John Doe", "Sales Executive", "Open"),
];

export const ManageClient = ({ loggedin }) => {
  const navigate = useNavigate();
  const [data, setData] = React.useState(rows);
  React.useEffect(() => {
    if (!loggedin) {
      navigate("/login");
    }
  }, [loggedin]);

  // ------for openAction in table Row---
  const [anchorEl, setAnchorEl] = React.useState(null);;
  const open = Boolean(anchorEl);;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);;
  };;
  const handleClose = () => {
    setAnchorEl(null);;
  };;
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
        <SearchBar rows={rows} setData={setData}/>   
        </Grid>
        <Grid item xm={12} sm={12} md={3} lg={3} textAlign="right">
          <Button
            variant="contained"
            component={Link}
            to="../manage-client/create-client"
            style={{ backgroundColor: "blue" }}
          >
            <AddCircleOutlineIcon />
            &nbsp; Add New User
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
            {data.map((row,index) => (
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
