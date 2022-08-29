import React, { useEffect } from "react";
import {
  Box,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const CreateEndUser = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  // const [message , setMessage] =useState({})
  const [input, setInput] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    password: "",
    role: "user",
  });
  const onchageTextFilid = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
    await axios
      .post("http://localhost:8000/user", {
        name: String(input.name),
        email: String(input.email),
        department: String(input.department),
        position: String(input.position),
        role: String("user"),
        password: String(temPass),
      })
      .then((res) =>
        navigate("/manage-user", {
          state: { message: res.data.message, status: res.status },
        })
      );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let a = generatePassword();
    sendData(a).then((a) => {
      console.log(a);
    });
  };

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
          Create End User
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
              <InputLabel>
                Full Name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                placeholder="Full Name"
                value={input.name}
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
                value={input.position}
                name="position"
                onChange={onchageTextFilid}
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                placeholder="Select Position"
                sx={{
                  background: "#F4FBFF",
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              >
                <MenuItem value="">
                  <em>Choose Position</em>
                </MenuItem>
                <MenuItem value={"Head of Product"}>Head of Product</MenuItem>
                <MenuItem value={"Product Manager"}>Product Manager</MenuItem>
                <MenuItem value={"VP of Marketing"}>VP of Marketing</MenuItem>
                <MenuItem value={"Technical Lead"}>Technical Lead</MenuItem>
                <MenuItem value={"Senior Software Engineer"}>
                  Senior Software Engineer
                </MenuItem>
                <MenuItem value={"Software Developer"}>
                  Software Developer
                </MenuItem>
                <MenuItem value={"Junior Software Developer"}>
                  Junior Software Developer
                </MenuItem>
                <MenuItem value={"Intern Software Developer"}>
                  Intern Software Developer
                </MenuItem>
              </Select>
            </Grid>

            <Grid item md={6} xs={12}>
              <InputLabel htmlFor="grouped-select">
                Department <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                value={input.department}
                name="department"
                onChange={onchageTextFilid}
                id="grouped-select"
                label="Grouping"
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
                <MenuItem value={"traineSE"}>traine</MenuItem>
                <MenuItem value={"seniorSE"}>senior</MenuItem>
                <ListSubheader>hr</ListSubheader>
                <MenuItem value={"juniorHR"}>junior</MenuItem>
                <MenuItem value={"seniorHR"}>senior</MenuItem>
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
  );
};
