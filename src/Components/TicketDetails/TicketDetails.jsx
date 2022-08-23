import {
    Box,
    Grid,
    Table,
    //TextField,
    TableCell,
    TableRow,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React from "react";
  import Divider from "@mui/material/Divider";
  import SaveAltIcon from "@mui/icons-material/SaveAlt";
  import { useTheme } from '@mui/material/styles';
  //import useMediaQuery from '@mui/material/useMediaQuery';
  
  //import { useTheme } from "@mui/material/styles";
  import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
  import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
  import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
  import Card from "@mui/material/Card";
  import Pdf from "../../Assets/Images/Pdf.png"
  
  export const TicketDetails = () => {
    // const theme = useTheme();
     const theme = useTheme();
   // const matches = useMediaQuery(theme.breakpoints.down( 'md'));
    const styles = {
      media: {
        height: 40,
        width:30,
       // paddingTop: '56.25%',// 16:9,
        //marginTop:'8'
      }
  };
    return (
      
        <Box component="form" noValidate autoComplete="off" sx={{width:'auto',paddingX:"5", [theme.breakpoints.down('md')]: {
          paddingX:'1 !important'
        }}} >
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
          <Typography variant="h6" sx={{ ml: 1,  fontSize: 25, fontweight: 600 }}>
            Ticket ID: #2345
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
                <Grid item xs={9} md={9} sx={{ m: 0, p: 0, mt: 0, mr:"auto" }}>
                  <Divider ></Divider>
                </Grid>
              </Grid>
  
              <Grid item xs={6} md={6}>
                <Table
                  //sx={{ minWidth: 580, marginLeft: "4px", marginTop: "1px" }}
                  sx={{ml: 1, width:'100%', [theme.breakpoints.up('md')]: {
                    width: '491px  !important'
                  } }}
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
                      Lorem ipsum
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
                      Open{" "}
                      <CreateOutlinedIcon
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
                      <CompareArrowsIcon
                        sx={{
                          color: "black",
                          fontSize: "15px",
                          marginLeft: "100px",
                        }}
                      />
                      <CreateOutlinedIcon
                        sx={{ color: "black", fontSize: "15px" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textalign="right"
                      sx={{ color: "#3B3B3B", border: "none" }}
                    >
                      Lorem ipsum
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
                      Medium
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
                <Grid item xs={7} md={8} sx={{ m: 0, p: 0, mt: 0, ml: 2}}>
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
                      
                      background: "#F4FBFF",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column"}}>
                      {/* <img src={Pdf} alt="pdf" style={styles.media}  /> */}
                      {/* <CardContent sx={{ flex: "1 0 auto" }}> */}
                      <Typography
                        component="div"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         variant="h5"
                        sx={{ ml: 2 , color: "black" }}
                      >
                         <img src={Pdf} alt="pdf" style={styles.media}  />
                        attachment_2345.pdf <SaveAltIcon sx={{ ml: 3 }} />
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ ml: 9}}
                      >
                        1.23MB .18/03/22
                      </Typography>
                      {/* </CardContent> */}
                    </Box>
                  </Card>
                </Grid>
  
                <Grid item xs={8} px={4} >
                <Card
                    sx={{
                      display: "flex",
                      ml: 2,
                      width: 360,
                      spacing:3,
                      background: "#F4FBFF",
                    }}
                    
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {/* <img src={Pdf} alt="pdf" style={styles.media}  /> */}
                      {/* <CardContent sx={{ flex: "1 0 auto" }}> */}
                      <Typography
                        component="div"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         variant="h5"
                        sx={{ ml: 2 , color: "black" }}
                      >
                         <img src={Pdf} alt="pdf" style={styles.media}  />
                        attachment_2345.pdf <SaveAltIcon sx={{ ml: 3 }} />
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ ml: 9}}
                      >
                        1.23MB .18/03/22
                      </Typography>
                      {/* </CardContent> */}
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
                      03/27/2022 , 11.20 AM
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
                      03/28/2022 , 01.50 PM
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
                      03/31/2022 , 04.34 PM
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      
    );
  };
  
  