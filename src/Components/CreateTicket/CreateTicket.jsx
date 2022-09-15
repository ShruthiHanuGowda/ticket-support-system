import {
  Box,
  Grid,
  // Form,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  Button,
  Link,
  TextField,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

//   import Radio from '@mui/material/Radio';
//   import RadioGroup from '@mui/material/RadioGroup';
//   import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

export const CreateTicket = () => {
  const theme = useTheme();
  const [imageArr, setImageArr] = useState([]);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

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

    await axios
      .post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        console.log("res::::", data);
        setImageArr([...data.data]);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    await axios.post("http://localhost:8000/ticket", {
      name: String(input.name),
      department: String(input.department),
      fileupload: imageArr,
      issuetype: String(input.issuetype),
      message: String(input.message),
      status: String("Open"),
    });
  };
  // console.log("Ticket Add Successfully!!");
  return (
    (<span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>),
    (
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
          <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
              <InputLabel spacing={2}>
                Full Name<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                name="name"
                value={input.name}
                placeholder="Name"
                //  onChange={handleChange}
                onChange={(e) => setInput(e.target.value)}
                sx={{
                  background: "#F4FBFF",
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>
                Department <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                label="Grouping"
                // placeholder="Select Position"
                name="department"
                value={input.department}
                onChange={handleChange}
                sx={{
                  background: "#F4FBFF",
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              >
                <MenuItem value="">
                  <em>hello</em>
                </MenuItem>
                <ListSubheader>Software Engineer</ListSubheader>
                <MenuItem value={"SE Tranie"}>traine</MenuItem>
                <MenuItem value={"Senior"}>senior</MenuItem>
                <ListSubheader>hr</ListSubheader>
                <MenuItem value={"HR Junior"}>junior</MenuItem>
                <MenuItem value={"HR Senior"}>senior</MenuItem>
              </Select>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>
                File Upload {imageArr.length}
                <span style={{ color: "red" }}>*</span>
              </InputLabel>

              <TextField
                type="file"
                multiple
                placeholder="Browser Files"
                name="fileupload"
                value={input.fileupload}
                onChange={uploadFile}
                sx={{
                  background: "#F4FBFF",
                  width: "100%",
                  Border: "none",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <FolderOpenIcon type="file" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel htmlFor="grouped-select">
                Issue Type <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                // Value="select "
                id="grouped-select"
                label="Grouping"
                name="issuetype"
                value={input.issuetype}
                onChange={handleChange}
                sx={{
                  background: "#F4FBFF",
                  width: "100%",

                  [theme.breakpoints.up("md")]: {
                    width: "491px ",
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <ListSubheader>Software Engineer</ListSubheader>
                <MenuItem value={"SE Traniee"}>traine</MenuItem>
                <MenuItem value={"Senior"}>senior</MenuItem>
                <ListSubheader>hr</ListSubheader>
                <MenuItem value={"HR Junior"}>junior</MenuItem>
                <MenuItem value={"HR Senior"}>senior</MenuItem>
              </Select>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel>
                Message <span style={{ color: "red" }}>*</span>
              </InputLabel>

              <TextareaAutosize
                name="message"
                value={input.message}
                onChange={handleChange}
                aria-label="empty textarea"
                placeholder="Enter here..."
                style={{
                  background: "#F4FBFF",
                  width: 500,
                  height: 100,
                  border: "none",
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
              to="#"
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
    )
  );
};
