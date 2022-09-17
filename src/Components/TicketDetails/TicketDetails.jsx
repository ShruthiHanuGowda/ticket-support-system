import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useTheme } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Card from "@mui/material/Card";
import Pdf from "../../Assets/Images/Pdf.png";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import DailogBoxModel from "../TicketDetails/dailogBox";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const TicketDetails = () => {
  const [data, setData] = useState({});
  const [edit, setedit] = useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [flagValue, setFlagValue] = useState(null);

   
  const id = useParams().id;

  useEffect(() => {
    const fecthTicketDetail = async () => {
      await axios.get(`/getSingleTicket/${id}`).then((res) => {
        setData(res.data.ticket);
      });
    };
    fecthTicketDetail();
  }, []);

  const handleOpenDialogBox = (flag) => {
    setFlagValue(flag.flag);
    setedit(true);
    setStatusOpen(true);
    // return(
    //   <DailogBoxModel  seteOpen={true}/>
    // )
  };

  const getImageURL = (imageIdArg) => {
    axios
      .get(`/getImageUrl/${imageIdArg}`)
      .then(({ data }) => {
        console.log("image link received :::", data.data);
        window.open(data.data, "_blank");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down( 'md'));
  const styles = {
    media: {
      height: 40,
      width: 30,
      // paddingTop: '56.25%',// 16:9,
      //marginTop:'8'
    },
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        width: "auto",
        paddingX: "5",
        [theme.breakpoints.down("md")]: {
          paddingX: "1 !important",
        },
      }}
    >
      {edit ? (
        <DailogBoxModel
          open={statusOpen}
          onClose={setStatusOpen}
          id={id}
          flag={flagValue}
        />
      ) : (
        ""
      )}
      <Typography
        paragraph
        sx={{
          ml: 1,
          fontSize: 25,
          fontweight: 600,
        }}
      >
        Ticket Details
      </Typography>
      <Typography variant="h6" sx={{ ml: 1, fontSize: 25, fontweight: 600 }}>
        Ticket ID: #{data._id}
      </Typography>

      <Grid container spacing={6} justify="space-between">
        <Grid item xs={6} md={6}>
          <Grid container alignItems={"center "}>
            <Grid item xs={2}>
              <Toolbar>
                <Typography
                  variant="paragraph"
                  sx={{
                    color: "#044BA9",
                    m: 0,
                    p: 0,
                    mt: 0,
                    mr: "auto",
                  }}
                >
                  Details
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item xs={9} md={9} sx={{ m: 0, p: 0, mt: 0, mr: "auto" }}>
              <Divider></Divider>
            </Grid>
          </Grid>

          <Grid item xs={6} md={6}>
            <Table
              sx={{
                ml: 1,
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  width: "491px  !important",
                },
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Ticket Department:
                </TableCell>
                <TableCell
                  textalign="right"
                  sx={{ m: 0, color: "#3B3B3B", border: "none" }}
                >
                  {data.department}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Priority:
                </TableCell>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  Medium
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Status:
                </TableCell>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  <FiberManualRecordIcon
                    sx={{ color: "green", fontSize: "8px" }}
                  />{" "}
                  {data.status}{" "}
                  <CreateOutlinedIcon
                    onClick={(e) => handleOpenDialogBox({ flag: "status" })}
                    sx={{ color: "black", fontSize: "15px" }}
                  />
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Grid>

        <Grid item xs={9} md={6}>
          <Grid container alignItems={"center"}>
            <Grid item xs={1} md={1}>
              <Toolbar>
                <Typography
                  variant="paragraph"
                  sx={{
                    color: "#044BA9",
                    m: 0,
                    p: 0,
                    mt: 0,
                    mr: 3,
                  }}
                >
                  Peoples
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item xs={6} md={4} sx={{ m: 0, p: 0, mt: 0, ml: 4 }}>
              <Divider></Divider>
            </Grid>
          </Grid>

          <Grid item xs={6} md={6}>
            <Table
              sx={{ minWidth: 1, marginLeft: "5px", marginTop: "1px" }}
              size="small"
              aria-label="a dense table"
            >
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Assignee:
                  <IconButton>
                    <CompareArrowsIcon
                      onClick={(e) => handleOpenDialogBox({ flag: "transfer" })}
                      sx={{
                        color: "black",
                        fontSize: "15px",
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    <CreateOutlinedIcon
                      onClick={(e) => handleOpenDialogBox({ flag: "assignee" })}
                      sx={{ color: "black", fontSize: "15px" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  {data.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Created By:
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  {data.name}
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Grid>
        <Grid item xs={6} md={6}>
          <Grid container alignItems={"center "}>
            <Grid item xs={2}>
              <Toolbar>
                <Typography
                  variant="paragraph"
                  sx={{
                    color: "#044BA9",
                    m: 0,
                    p: 0,
                    mt: 0,
                    ml: "auto",
                  }}
                >
                  Attachments
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item xs={7} md={8} sx={{ m: 0, p: 0, mt: 0, ml: 2 }}>
              <Divider></Divider>
            </Grid>
          </Grid>
          <Grid container spacing={1} xs={8} md={6}>
            <Grid item xs={8} px={4}>
              <Card
                sx={{
                  display: "flex",
                  ml: 2,
                  width: 360,
                  spacing: 3,
                  background: "#F4FBFF",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ ml: 2, color: "black" }}
                  >
                    <img src={Pdf} alt="pdf" style={styles.media} />
                    {data &&
                      data.fileupload &&
                      data.fileupload[0] &&
                      data.fileupload[0].imageName}
                    <SaveAltIcon
                      sx={{ ml: 9 }}
                      onClick={() => {
                        getImageURL(
                          data &&
                            data.fileupload &&
                            data.fileupload[0] &&
                            data.fileupload[0].imageID
                        );
                      }}
                    />
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ ml: 9 }}
                  >
                    1.23MB .18/03/22
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} md={6}>
          <Grid container alignItems={"center"}>
            <Grid item xs={1} md={1}>
              <Toolbar>
                <Typography
                  variant="paragraph"
                  sx={{
                    color: "#044BA9",
                    m: 0,
                    p: 0,
                    mt: 0,
                    mr: 5,
                    border: "none",
                  }}
                >
                  Dates
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item xs={6} md={4} sx={{ m: 0, p: 0, mt: 0, ml: 2 }}>
              <Divider></Divider>
            </Grid>
          </Grid>
          <Grid item xs={8} md={6}>
            <Table
              sx={{ minWidth: 1, marginLeft: "5px", marginTop: "1px" }}
              size="small"
              aria-label="a dense table"
            >
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Created:
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  {data.createdAt}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Updated :
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  {data.updatedAt}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ m: 0, color: "#777777", border: "none" }}
                  textalign="left"
                >
                  Solved :
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  textalign="right"
                  sx={{ color: "#3B3B3B", border: "none" }}
                >
                  {data.solvedAt}
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
