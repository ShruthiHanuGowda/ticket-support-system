import {
  Box,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  Button,
  Link,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
export const CreateTicket = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [imageArr, setImageArr] = useState([]);
  console.log(imageArr);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //const navigate = useNavigate();
  const [loaderOpen, setloaderOpen] = React.useState(false);

  // @@@@@@@@@@@@@@@@@@ For loading files@@@@@@@@@@@@@@@@


  const [input, setInput] = useState({
    name: "",
    department: [],
    fileupload: "",
    issuetype: "",
    message: "",
  });
  useEffect(() => {
    const userdata = JSON.parse(sessionStorage.getItem("userData"));
    console.log(userdata);
    setInput(userdata);
  }, []);
  //   console.log(input)
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = await e.target.files;
    setloaderOpen(true);
    await axios
      .post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        console.log("res::::", data);
        setImageArr([...data.data]);
        setloaderOpen(false);
      })
      .catch((err) => {
        console.log("error", err);
        setloaderOpen(false);
      });
  };
  const handleSubmit = async (e) => {
    const toastId = toast.loading("Please Waiting.....");
    e.preventDefault();
    console.log(input);
    // await axios.get("/create-ticket-id").then((res) => console.log(res))
    await axios
      .post("/ticket", {
        name: String(input.name),
        department: String(input.department),
        fileupload: imageArr,
        issuetype: String(input.issuetype),
        message: String(input.message),
        status: String("Open"),
      })
      .then((res) => {
        if (res.status === "500") {
          toast.dismiss(toastId);
          toast.error(res.data.message);
        } else {
          toast.dismiss(toastId);
          toast.success(res.data.message);
        }
      });
    setInput({
      name: "",
      department: "",
      fileupload: "",
      issuetype: "",
      message: "",
    });
    setImageArr([])
  };

  const handlerDeleteAttechmentChip = async (id) => {
    console.log("id in console ::::::::::", id);
    await axios
      .get(`/deleteImageIncloudy/${id}`)
      .then(({ data }) => {
        console.log("res::::", data);
        setImageArr((chips) => chips.filter((chip) => chip.imageID !== id));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    (<span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>),
    (
      <>
        <Toaster />
        <Box
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
          <Typography variant="h5" sx={{ my: 4 }}>
            Create Ticket
          </Typography>
          <Form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <Grid container justify="center" spacing={6}>
              <Grid item md={6} xs={12}>
                <InputLabel style={{ fontWeight: "bold" }}>
                  Full Name 
                </InputLabel>
                <TextField
                  InputProps={{ readOnly: true, disableUnderline: true }}
                  type="text"
                  name="name"
                   
                  variant="standard"
                  value={input.name}
                  placeholder="Name"
                  onChange={(e) =>
                    setInput(e.target.value) ? e.preventDefault() : ""
                  }
                  sx={{
                    marginTop: "10px",
                    background: "#F4FBFF",
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    paddingLeft: "15px",
                    borderRadius: "5px",
                    [theme.breakpoints.up("md")]: {
                      width: "491px  !important",
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel style={{ fontWeight: "bold" }}>
                  Department  
                </InputLabel>
                <Select
                  label="Grouping"
                  // placeholder="Select Position"
                  name="department"
                   
                  disableUnderline
                  variant="standard"
                  value={input.department}
                  onChange={handleChange}
                  sx={{
                    border: "none",
                    marginTop: "10px",
                    background: "#F4FBFF",
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    paddingX: "15px",
                    borderRadius: "5px",
                    [theme.breakpoints.up("md")]: {
                      width: "491px  !important",
                    },
                  }}
                >
                 <ListSubheader style={{ fontWeight: "bold" }}>
                    Software Engineer
                  </ListSubheader>
                  <MenuItem value={"TraineSE"}>Trainee</MenuItem>
                  <MenuItem value={"SeniorSE"}>Senior</MenuItem>
                  <ListSubheader style={{ fontWeight: "bold" }}>
                    HR
                  </ListSubheader>
                  <MenuItem value={"JuniorHR"}>Junior</MenuItem>
                  <MenuItem value={"SeniorHR"}>Senior</MenuItem>            
              </Select>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel style={{ fontWeight: "bold" }}>
                  File Upload {imageArr.length}
                  <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  type="file"
                  variant="standard"
                  placeholder="Browser Files"
                  name="fileupload"
                  value={input.fileupload}
                  required 
                  onChange={uploadFile}
                  sx={{
                    marginTop: "10px",
                    background: "#F4FBFF",
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    paddingX: "15px",
                    borderRadius: "5px",
                    Border: "none",
                    [theme.breakpoints.up("md")]: {
                      width: "491px  !important",
                    },
                    "& .MuiInputBase-input": {
                      height: "-0.5625em!important",
                    },
                  }}
                  inputProps={{
                    multiple: true,
                    accept: ["application/pdf", "image/*"],
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <FolderOpenIcon type="file" />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                />
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 1,
                    ml: 0,
                    width: "77%",
                    boxShadow: "none",
                  }}
                  component="ul"
                >
                  {imageArr.map((data) => {

                    return (
                      <ListItem key={data.imageID}>
                        <Chip
                          sx={{ backgroundColor: "#F4FBFF", color: "#0E2D7B" }}
                          label={data.imageName}
                          onDelete={() =>
                            handlerDeleteAttechmentChip(data.imageID)
                          }
                        />
                      </ListItem>
                    );
                  })}
                </Paper>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loaderOpen}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel
                  htmlFor="grouped-select"
                  style={{ fontWeight: "bold" }}
                >
                  Issue Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  id="grouped-select"
                  label="Grouping"
                  name="issuetype"
                  required
                  disableUnderline
                  variant="standard"
                  value={input.issuetype}
                  onChange={handleChange}
                  sx={{
                    border: "none",
                    marginTop: "10px",
                    background: "#F4FBFF",
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    padding: "15px",
                    borderRadius: "5px",
                    [theme.breakpoints.up("md")]: {
                      width: "491px ",
                    },
                  }}
                >
                  {console.log("hiiiiiiiiiiiiiiiii", input.issuetype === "")}
                  <ListSubheader style={{ fontWeight: "bold" }}>
                    Software Engineer
                  </ListSubheader>
                  <MenuItem value={"TraineSE"}>Trainee</MenuItem>
                  <MenuItem value={"SeniorSE"}>Senior</MenuItem>
                  <ListSubheader style={{ fontWeight: "bold" }}>
                    HR
                  </ListSubheader>
                  <MenuItem value={"JuniorHR"}>Junior</MenuItem>
                  <MenuItem value={"SeniorHR"}>Senior</MenuItem>     
                </Select>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel style={{ fontWeight: "bold" }}>
                  Message <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextareaAutosize
                  name="message"
                  required
                  value={input.message}
                  onChange={handleChange}
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Enter here..."
                  style={{
                    width: "100%",
                    background: "#F4FBFF",
                    borderRadius: "5px",
                    border: "none",
                    outline: "none",
                    justifyContent: "center",
                    padding: "15px",
                    // [theme.breakpoints.up("md")]: {
                    //        width: "490px  ",
                    //      }
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12} padding={1}></Grid>
            </Grid>
            <Grid container>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: "#044BA9",
                  marginTop: "20px",
                  marginRight: "11px",
                  marginBottom: "19px",
                }}
              >
                Create
              </Button>
              <Link
                onClick={() => { navigate(-1) }}
                variant="outlined"
                spacing={8}
                sx={{ marginTop: "22px", marginBottom: "15px" }}
              >
                {" "}
                Discard{" "}
              </Link>
            </Grid>
          </Form>
        </Box>
      </>
    )
  );
};
