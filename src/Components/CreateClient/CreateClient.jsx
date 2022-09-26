import {
  Box,
  Grid,
  //Input,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from 'react'

import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const CreateClient = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  let navigate = useNavigate();
  // const [checkBoxClient , setcheckBoxClient]=useState([])
  const [input, setInput] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    password: "",
    role: "client",
    // clientAccess:,
  });

  const id = useParams().id;
  useEffect(() => {
    const fetchUserData = async () => {
      return await axios
        .get(`/user/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInput(data.user);
        });
    };
    if (id) {
      fetchUserData();
    }
    console.log(fetchUserData);
  }, [])

  const onchageTextFilid = (e) => {
    // console.log(e.target.value);
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();


    let a = generatePassword();
    sendData(a).then((a) => {
      console.log("i ear then function =====", a);
    });
  };

  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const sendData = async (temPass) => {
    // console.log("in send data", temPass);
    await axios
      .post("/user", {
        name: String(input.name),
        email: String(input.email),
        department: String(input.department),
        position: String(input.position),
        role: String("client"),
        password: String(temPass),
        // clientAccess:String(input.clientAccess)
      })
      .then((res) =>
        navigate("/manage-client", {
          state: { message: res.data.message, status: res.status },
        })
      ).catch(function (error) {
        toast.error(error.response?.data?.message);
      });
  };


  // const checkBoxClientAccess =(e)=>{
  //   setcheckBoxClient((prevState) => ({
  //     ...prevState,
  //     'clientAccess': e.target.value,
  //   }));
  //   console.log(checkBoxClient)
  // }

  // --------------Update CLie-nt-----------
  const handleUpdate = (e) => {
    e.preventDefault();
    updateRequest()
      .then((res) => {
        navigate("/manage-client", {
          state: { message: res.message, status: res.status },
        });
        console.log("called");
      })
      .catch(function (error) {
        toast.error(error.response?.data?.message);
      });
  };

  const updateRequest = async () => {
    return await axios
      .put(`/user/${id}`, {
        name: String(input.name),
        email: String(input.email),
        department: String(input.department),
        position: String(input.position),
        role: String("client"),
        password: String(input.temPass),
      })
      .then((res) => res.data);
  };


  if (id) {
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
          <Toaster />
          <Typography variant="h5" sx={{ my: 4 }}>
            Update Client
          </Typography>
          <Form onSubmit={handleUpdate}>
            <Grid container justify="center" spacing={4}>
              <Grid item md={6} xs={12}>
                <InputLabel>
                  Full Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Full Name"
                  name="name"
                  onChange={onchageTextFilid}
                  type="text"
                  required
                  value={input.name}
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
                  Email <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Email"
                  value={input.email}
                  name="email"
                  type="email"
                  required
                  onChange={onchageTextFilid}
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
                <InputLabel htmlFor="grouped-select">
                  Position <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select

                  id="grouped-select"
                  name="position"
                  required
                  value={input.position}
                  onChange={onchageTextFilid}
                  label="Grouping"
                  placeholder="Select Position"
                  sx={{
                    background: "#F4FBFF",
                    width: "100%",
                    [theme.breakpoints.up("md")]: {
                      width: "491px  ",
                    },
                  }}
                >
                  <MenuItem value=""
                  >
                    <em>None</em>
                  </MenuItem>
                  <ListSubheader>Software Engineer</ListSubheader>
                  <MenuItem value={1}>traine</MenuItem>
                  <MenuItem value={2}>senior</MenuItem>
                  <ListSubheader>hr</ListSubheader>
                  <MenuItem value={3}>junior</MenuItem>
                  <MenuItem value={4}>senior</MenuItem>
                </Select>
              </Grid>

              <Grid item md={6} xs={12}>
                <InputLabel htmlFor="grouped-select">
                  Department <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  value={input.department}
                  name="department"

                  id="grouped-select"
                  label="Grouping"
                  onChange={onchageTextFilid}
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
                  <MenuItem value={1}>traine</MenuItem>
                  <MenuItem value={2}>senior</MenuItem>
                  <ListSubheader>hr</ListSubheader>
                  <MenuItem value={3}>junior</MenuItem>
                  <MenuItem value={4}>senior</MenuItem>
                </Select>
              </Grid>
             
              <Grid item mt={4}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    marginTop: "20px",
                    marginRight: "11px",
                    marginBottom: "19px",
                  }}
                >
                  Update
                </Button>
                <Link
                  variant="outlined"
                  spacing={8}
                  sx={{ marginTop: "22px", marginBottom: "15px" }}
                >
                  Discard
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
      )
    )
  } else { }
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
        <Toaster />
        <Typography variant="h5" sx={{ my: 4 }}>
          Create Client
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
              <InputLabel>
                Full Name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                placeholder="Full Name"
                name="name"
                onChange={onchageTextFilid}
                type="text"
                required
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
                Email <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                placeholder="Email"
                value={input.email}
                name="email"
                type="email"
                required
                onChange={onchageTextFilid}
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
              <InputLabel htmlFor="grouped-select">
                Position <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                name="position"
                required
                onChange={onchageTextFilid}
                label="Grouping"
                placeholder="Select Position"
                sx={{
                  background: "#F4FBFF",
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  ",
                  },
                }}
              >
                <MenuItem value=""
                >
                  <em>None</em>
                </MenuItem>
                <ListSubheader>Software Engineer</ListSubheader>
                <MenuItem value={1}>traine</MenuItem>
                <MenuItem value={2}>senior</MenuItem>
                <ListSubheader>hr</ListSubheader>
                <MenuItem value={3}>junior</MenuItem>
                <MenuItem value={4}>senior</MenuItem>
              </Select>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel htmlFor="grouped-select">
                Department <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                defaultValue=""
                value={input.department}
                name="department"
                id="grouped-select"
                label="Grouping"
                onChange={onchageTextFilid}
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
                <MenuItem value={1}>traine</MenuItem>
                <MenuItem value={2}>senior</MenuItem>
                <ListSubheader>hr</ListSubheader>
                <MenuItem value={3}>junior</MenuItem>
                <MenuItem value={4}>senior</MenuItem>
              </Select>
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked onClick={checkBoxClientAccess} value="view"/>}
                  label="View"
                />
                <FormControlLabel
                  control={<Checkbox  onClick={checkBoxClientAccess}  value="edit"/>}
                  label="Edit"
                />
                <FormControlLabel
                control={<Checkbox  onClick={checkBoxClientAccess}  value="transfer"/>}
                label="Transfer"
              />
              </FormGroup>
            </Grid> */}
            <Grid item mt={4}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: "20px",
                  marginRight: "11px",
                  marginBottom: "19px",
                }}
              >
                Create
              </Button>
              <Link
                variant="outlined"
                spacing={8}
                sx={{ marginTop: "22px", marginBottom: "15px" }}
              >
                Discard
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Box>
    )
  )




}
