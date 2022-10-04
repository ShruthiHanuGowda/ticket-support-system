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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
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
  const navigate = useNavigate();
  const [Error, setError] = React.useState(false);

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
    //console.log(fetchUserData);
  }, []);
  ////--------- For textFields-----//////
  const onchageTextFilid = (e) => {
    // console.log(e.target.value);
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  /////////////------ For Email Validation----------/////////
  const validate = () => {
    if (input.name === "") {
      toast.error("name is empty");
      return false;
    } else {
      if (input.email === "") {
        toast.error("email is empty");
        return false;
      } else {
        if (!input.email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) {
          toast.error("please enter valid email address");
          return false;
        } else {
          console.log(input.department, input.position);
          if (input.department == "" || input.position == "") {
            toast.error("All Fields Are Required");
            return false;
          } else {
            return true;
          }
        }
      }
    }
  };
  /////////-------For handleSubmit-------///////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validation = await validate();
    setError(validation)
    console.log(validation)
    console.log("hiii validation", validation)
    if (Error === true) {
      let a = generatePassword();
      sendData(a).then((a) => {
        console.log("hhhhhhhhhhhhhh",)
        console.log("i ear then function =====", a);
      });
    }
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
      )
      .catch(function (error) {
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
                <InputLabel style={{ fontWeight: "bold" }}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Full Name"
                  name="name"
                  onChange={onchageTextFilid}
                  type="text"
                  required
                  InputProps={{ disableUnderline: true }}
                  variant="standard"
                  value={input.name}
                  sx={{
                    marginTop: "10px", background: "#F4FBFF",
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
                  Email <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Email"
                  value={input.email}
                  name="email"
                  type="email"
                  onChange={onchageTextFilid}
                  required
                  InputProps={{ disableUnderline: true }}
                  variant="standard"
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
                <InputLabel htmlFor="grouped-select" style={{ fontWeight: "bold" }}>
                  Position
                </InputLabel>
                <Select
                  id="grouped-select"
                  name="position"
                  value={input.position}
                  onChange={onchageTextFilid}
                  disableUnderline
                  variant="standard"
                  label="Grouping"
                  placeholder="Select Position"
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
                >
                  <ListSubheader style={{ fontWeight: "bold" }}>Software Engineer</ListSubheader>
                  <MenuItem value={1}>Trainee</MenuItem>
                  <MenuItem value={2}>Senior</MenuItem>
                  <ListSubheader style={{ fontWeight: "bold" }}>HR</ListSubheader>
                  <MenuItem value={3}>Junior</MenuItem>
                  <MenuItem value={4}>Senior</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputLabel htmlFor="grouped-select" style={{ fontWeight: "bold" }}>
                  Department
                </InputLabel>
                <Select
                  value={input.department}
                  name="department"
                  id="grouped-select"
                  label="Grouping"
                  onChange={onchageTextFilid}
                  disableUnderline
                  variant="standard"
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
                >
                  <ListSubheader style={{ fontWeight: "bold" }}>Software Engineer</ListSubheader>
                  <MenuItem value={1}>Trainee</MenuItem>
                  <MenuItem value={2}>Senior</MenuItem>
                  <ListSubheader style={{ fontWeight: "bold" }}>HR</ListSubheader>
                  <MenuItem value={3}>Junior</MenuItem>
                  <MenuItem value={4}>Senior</MenuItem>
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
                  onClick={() => { navigate(-1) }}
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
  } else {
  }
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
              <InputLabel style={{ fontWeight: "bold" }}>
                Full Name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                placeholder="Full Name"
                name="name"
                onChange={onchageTextFilid}
                InputProps={{ disableUnderline: true }}
                variant="standard"
                type="text"
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
                Email <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                placeholder="Email"
                value={input.email}
                name="email"
                type="email"
                onChange={onchageTextFilid}
                InputProps={{ disableUnderline: true }}
                variant="standard"
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
              <InputLabel style={{ fontWeight: "bold" }} htmlFor="grouped-select">
                Position <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                name="position"
                onChange={onchageTextFilid}
                disableUnderline
                variant="standard"
                label="Grouping"
                placeholder="Select Position"
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
              >
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
              <InputLabel htmlFor="grouped-select" style={{ fontWeight: "bold" }}
              >
                Department <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                defaultValue=""
                value={input.department}
                name="department"
                id="grouped-select"
                label="Grouping"
                onChange={onchageTextFilid}
                disableUnderline
                variant="standard"
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
                onClick={() => { navigate(-1) }}
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
