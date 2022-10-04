import React, { useEffect } from "react";
import { Box, Grid, InputLabel, ListSubheader, MenuItem, Select, TextField, Typography, Button, Link, MenuList } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Form } from "react-bootstrap";
 import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
export const CreateEndUser = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [Error, setError] = React.useState(false);
  const [singleUser, setSingleUser] = useState({});
  console.log(singleUser);
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
      .post("/user", {
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
        }).then((res) => {
          console.log(res);
          if (res.status === "201") {
            console.log("hiii");
          }
        })
      )
      .catch(function (error) {
        toast.error(error.response?.data?.message);
      });
  };
  /////////// For Email Validation////////////////////
  const validate = () => {
    if (input.name == "") {
      toast.error("Name is Empty!!");
      return false;
    } else {
      if (input.email == "") {
        toast.error("Email is Empty!!");
        return false;
      } else {
        if (!input.email.match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) {
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
    setError(validation);
    console.log(validation);
    console.log("hiii validation", validation, Error);
    if (Error == true) {
      console.log("ddhdhhd", Error);
      let a = generatePassword();
      sendData(a).then((a) => {
        console.log("i ear then function =====", a);
      });
    }
  };

  const _id = useParams().id;
  console.log(_id);
  useEffect(() => {
    const fetchUserData = async () => {
      return await axios
        .get(`/user/${_id}`)
        .then((res) => res.data)
        .then((data) => {
          setInput(data.user);
        });
    };
    if (_id) {
      fetchUserData();
    }
    console.log(fetchUserData);
  }, [_id]);
  const handleUpdate = (e) => {
    e.preventDefault();
    updateRequest()
      .then((res) => {
        navigate("/manage-user", {
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
      .put(`/user/${_id}`, {
        name: String(input.name),
        email: String(input.email),
        department: String(input.department),
        position: String(input.position),
        role: String("user"),
        password: String(input.temPass),
      })
      .then((res) => res.data);
  };
  if (!_id) {
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
            Create End User
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Grid container justify="center" spacing={5}>
              <Grid item md={6} xs={12}>
                <InputLabel style={{ fontWeight: "bold" }}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Full Name"
                  value={input.name}
                  name="name"
                  onChange={onchageTextFilid}
                  type="text"
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
                <InputLabel style={{ fontWeight: "bold" }}>
                  Email <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Email"
                  value={input.email}
                  InputProps={{ disableUnderline: true }}
                  name="email"
                  type="email"
                  onChange={onchageTextFilid}
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
                <InputLabel
                  htmlFor="grouped-select"
                  style={{ fontWeight: "bold" }}
                >
                  Position <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  value={input.position}
                  name="position"
                  onChange={onchageTextFilid}
                  defaultValue=""
                  id="grouped-select"
                  label="Select Position"
                  disableUnderline
                  variant="standard"
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
                <InputLabel
                  htmlFor="grouped-select"
                  style={{ fontWeight: "bold" }}
                >
                  Department <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  value={input.department}
                  name="department"
                  onChange={onchageTextFilid}
                  id="grouped-select"
                  label="Grouping"
                  disableUnderline
                  variant="standard"
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
                <Link variant="outlined" onClick={() => { navigate(-1) }} spacing={8} sx={{ marginTop: "22px", marginBottom: "15px" }}>
                  Discard
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
      )
    );
  } else {
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
          {" "}
          <Toaster />
          <Typography variant="h5" sx={{ my: 4 }}>
            Edit End User
          </Typography>
          <Form onSubmit={handleUpdate}>
            <Grid container justify="center" spacing={5}>
              <Grid item md={6} xs={12}>
                <InputLabel style={{ fontWeight: "bold" }}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Full Name"
                  value={input.name}
                  name="name"
                  onChange={onchageTextFilid}
                  type="text"
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
                <InputLabel style={{ fontWeight: "bold" }}>
                  Email <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Email"
                  value={input.email}
                  name="email"
                  type="email"
                  required
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
                <InputLabel
                  htmlFor="grouped-select"
                  style={{ fontWeight: "bold" }}
                >
                  Position <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  value={input.position}
                  name="position"
                  onChange={onchageTextFilid}
                  defaultValue=""
                  id="grouped-select"
                  label="Select Position"
                  disableUnderline
                  required
                  variant="standard"
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
                <InputLabel
                  htmlFor="grouped-select"
                  style={{ fontWeight: "bold" }}
                >
                  Department <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  value={input.department}
                  name="department"
                  onChange={onchageTextFilid}
                  id="grouped-select"
                  label="Grouping"
                  disableUnderline
                  required
                  variant="standard"
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
                  <MenuItem value={"TraineeSE"}>Trainee</MenuItem>
                  <MenuItem value={"SeniorSE"}>Senior</MenuItem>
                  <ListSubheader style={{ fontWeight: "bold" }}>
                    HR
                  </ListSubheader>
                  <MenuItem value={"JuniorHR"}>Junior</MenuItem>
                  <MenuItem value={"SeniorHR"}>Senior</MenuItem>
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
                <Link onClick={() => { navigate(-1) }} variant="outlined" spacing={8} sx={{ marginTop: "22px", marginBottom: "15px" }}>
                  Discard
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
      )
    );
  }
};

// import React, { useEffect } from "react";
// import { Box, Grid, InputLabel, ListSubheader, MenuItem, Select, TextField, Typography, Button, Link } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { Form } from "react-bootstrap";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { useParams } from "react-router-dom";
// export const CreateEndUser = () => {
//   const theme = useTheme();
//   const matches = useMediaQuery(theme.breakpoints.down("md"));
//   const navigate = useNavigate();

//   const [Error , setError] = useState(false)
//   const [singleUser, setSingleUser] = useState({});
//   console.log(singleUser);
//   const [input, setInput] = useState({
//     name: "",
//     email: "",
//     department: "",
//     position: "",
//     password: "",
//     role: "user",
//   });
//   const onchageTextFilid = (e) => {
//     setInput((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   function generatePassword() {
//     var length = 8,
//       charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       retVal = "";
//     for (var i = 0, n = charset.length; i < length; ++i) {
//       retVal += charset.charAt(Math.floor(Math.random() * n));;
//     }
//     return retVal;;
//   }
//   const sendData = async (temPass) => {
//     await axios
//       .post("/user", {
//         name: String(input.name),
//         email: String(input.email),
//         department: String(input.department),
//         position: String(input.position),
//         role: String("user"),
//         password: String(temPass),
//       })
//       .then((res) =>
//         navigate("/manage-user", {
//           state: { message: res.data.message, status: res.status },
//         }).then((res) => {
//           console.log(res);
//           if (res.status === "201") {
//             console.log("hiii");
//           }
//         })
//       )
//       .catch(function (error) {
//         toast.error(error.response?.data?.message);
//       });
//   };

//   /////////// For Email Validation////////////////////

//   const validate = () =>{

//     if(input.name == ""){
//       toast.error("Name is Empty!!")
//       setError(false)
//     }else {
//       if(input.email == ""){
//         toast.error("Email is Email")
//         setError(false)
//       }else {
//         if (!input.email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) {
//           toast.error("please enter valid email address");
//           setError(false)
//         }else{

//           console.log("hiiiiiiiiiiiiiiiiiiiiiiiii" , Error)

//          return true;
//         }

//       }
//     }

//   }

//   /////////-------For handleSubmit-------///////////
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let validation = await validate();
//     setError(validation)
//     console.log("hiii validation" , validation)
//     if(Error === true){
//       let a = generatePassword();
//       sendData(a).then((a) => {
//         console.log("i ear then function =====", a);
//       });

//     }else{
//       toast.error("Please Enter A Valid Details")

//     }
//     return true;

//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   let a = generatePassword();
//   //   console.log(a);
//   //   sendData(a);;

//   // };
//   // ----------------for Update User Data
//   const _id = useParams().id;
//   console.log(_id);
//   useEffect(() => {
//     const fetchUserData = async () => {
//       return await axios
//         .get(`/user/${_id}`)
//         .then((res) => res.data)
//         .then((data) => {
//           setInput(data.user);
//         });
//     };
//     if (_id) {
//       fetchUserData();
//     }
//     console.log(fetchUserData);
//   }, [_id]);
//   const handleUpdate = (e) => {
//     e.preventDefault();;
//     updateRequest()
//       .then((res) => {
//         navigate("/manage-user", {
//           state: { message: res.message, status: res.status },
//         });
//         console.log("called");
//       })
//       .catch(function (error) {
//         toast.error(error.response?.data?.message);
//       });
//   };

//   const updateRequest = async () => {
//     return await axios
//       .put(`/user/${_id}`, {
//         name: String(input.name),
//         email: String(input.email),
//         department: String(input.department),
//         position: String(input.position),
//         role: String("user"),
//         password: String(input.temPass),
//       })
//       .then((res) => res.data);
//   };

//   if (!_id) {
//     return (
//       (<span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>),
//       (
//         <Box
//           noValidate
//           autoComplete="off"
//           sx={{
//             width: "auto",
//             paddingX: "5",
//             [theme.breakpoints.down("md")]: {
//               paddingX: "1 !important",
//             },
//           }}
//         >
//           <Toaster />
//           <Typography variant="h5" sx={{ my: 4 }}>
//             Create End User
//           </Typography>
//           <Form onSubmit={handleSubmit}>
//             <Grid container justify="center" spacing={5}>
//               <Grid item md={6} xs={12}>
//                 <InputLabel style={{ fontWeight: "bold" }}>
//                   Full Name <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <TextField
//                   placeholder="Full Name"
//                   value={input.name}
//                   name="name"
//                   onChange={onchageTextFilid}
//                   type="text"
//                   InputProps={{ disableUnderline: true }}

//                   variant="standard"
//                   sx={{
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingLeft: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item md={6} xs={12}>
//                 <InputLabel style={{ fontWeight: "bold" }}>
//                   Email <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <TextField
//                   placeholder="Email"
//                   value={input.email}
//                   InputProps={{ disableUnderline: true }}
//                   name="email"
//                   type="email"

//                   onChange={onchageTextFilid}
//                   variant="standard"
//                   sx={{
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingLeft: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 />
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <InputLabel htmlFor="grouped-select" style={{ fontWeight: "bold" }}>
//                   Position <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <Select
//                   value={input.position}
//                   name="position"
//                   onChange={onchageTextFilid}
//                   defaultValue=""
//                   id="grouped-select"
//                   label="Grouping"
//                   placeholder="Select Position"
//                   disableUnderline

//                   variant="standard"
//                   sx={{
//                     border: "none",
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     padding: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 >

//                   <MenuItem value={"Head of Product"}>Head of Product</MenuItem>
//                   <MenuItem value={"Product Manager"}>Product Manager</MenuItem>
//                   <MenuItem value={"VP of Marketing"}>VP of Marketing</MenuItem>
//                   <MenuItem value={"Technical Lead"}>Technical Lead</MenuItem>
//                   <MenuItem value={"Senior Software Engineer"}>Senior Software Engineer</MenuItem>
//                   <MenuItem value={"Software Developer"}>Software Developer</MenuItem>
//                   <MenuItem value={"Junior Software Developer"}>Junior Software Developer</MenuItem>
//                   <MenuItem value={"Intern Software Developer"}>Intern Software Developer</MenuItem>
//                 </Select>
//               </Grid>

//               <Grid item md={6} xs={12}>
//                 <InputLabel htmlFor="grouped-select" style={{ fontWeight: "bold" }}>
//                   Department <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <Select
//                   value={input.department}
//                   name="department"
//                   onChange={onchageTextFilid}
//                   id="grouped-select"
//                   label="Grouping"
//                   disableUnderline
//                   required
//                   variant="standard"
//                   sx={{
//                     border: "none",
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingX: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   <ListSubheader>Software Engineer</ListSubheader>
//                   <MenuItem value={"traineSE"}>traine</MenuItem>
//                   <MenuItem value={"seniorSE"}>senior</MenuItem>
//                   <ListSubheader>hr</ListSubheader>
//                   <MenuItem value={"juniorHR"}>junior</MenuItem>
//                   <MenuItem value={"seniorHR"}>senior</MenuItem>
//                 </Select>
//               </Grid>
//               <Grid item mt={4}>
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   sx={{
//                     marginTop: "20px",
//                     marginRight: "11px",
//                     marginBottom: "19px",
//                   }}
//                 >
//                   Create
//                 </Button>
//                 <Link variant="outlined" spacing={8} sx={{ marginTop: "22px", marginBottom: "15px" }}>
//                   Discard
//                 </Link>
//               </Grid>
//             </Grid>
//           </Form>
//         </Box>
//       )
//     );
//   } else {
//     return (
//       (<span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>),
//       (
//         <Box
//           noValidate
//           autoComplete="off"
//           sx={{
//             width: "auto",
//             paddingX: "5",
//             [theme.breakpoints.down("md")]: {
//               paddingX: "1 !important",
//             },
//           }}
//         >
//           {" "}
//           <Toaster />
//           <Typography variant="h5" sx={{ my: 4 }}>
//             Edit End User
//           </Typography>
//           <Form onSubmit={handleUpdate}>
//             <Grid container justify="center" spacing={5}>
//               <Grid item md={6} xs={12}>
//                 <InputLabel>
//                   Full Name <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <TextField
//                   placeholder="Full Name"
//                   value={input.name}
//                   name="name"
//                   onChange={onchageTextFilid}
//                   type="text"
//                   InputProps={{ disableUnderline: true }}
//                   required
//                   variant="standard"
//                   sx={{
//                     // border: "none",
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingLeft: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item md={6} xs={12}>
//                 <InputLabel style={{ fontWeight: "bold" }}>
//                   Email <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <TextField
//                   placeholder="Email"
//                   value={input.email}
//                   name="email"
//                   type="email"
//                   required
//                   onChange={onchageTextFilid}
//                   InputProps={{ disableUnderline: true }}
//                   variant="standard"
//                   sx={{
//                     // border: "none",
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingLeft: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item md={6} xs={12}>
//                 <InputLabel
//                   htmlFor="grouped-select"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   Position <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <Select
//                   value={input.position}
//                   name="position"
//                   onChange={onchageTextFilid}
//                   defaultValue=""
//                   id="grouped-select"
//                   label="Grouping"
//                   placeholder="Select Position"
//                   disableUnderline
//                   variant="standard"
//                   sx={{
//                     border: "none",
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingX: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>Choose Position</em>
//                   </MenuItem>
//                   <MenuItem value={"Head of Product"}>Head of Product</MenuItem>
//                   <MenuItem value={"Product Manager"}>Product Manager</MenuItem>
//                   <MenuItem value={"VP of Marketing"}>VP of Marketing</MenuItem>
//                   <MenuItem value={"Technical Lead"}>Technical Lead</MenuItem>
//                   <MenuItem value={"Senior Software Engineer"}>Senior Software Engineer</MenuItem>
//                   <MenuItem value={"Software Developer"}>Software Developer</MenuItem>
//                   <MenuItem value={"Junior Software Developer"}>Junior Software Developer</MenuItem>
//                   <MenuItem value={"Intern Software Developer"}>Intern Software Developer</MenuItem>
//                 </Select>
//               </Grid>
//               <Grid item md={6} xs={12}>
//                 <InputLabel
//                   htmlFor="grouped-select"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   Department <span style={{ color: "red" }}>*</span>
//                 </InputLabel>
//                 <Select
//                   value={input.department}
//                   name="department"
//                   onChange={onchageTextFilid}
//                   id="grouped-select"
//                   label="Grouping"
//                   disableUnderline
//                   variant="standard"
//                   sx={{
//                     border: "none",
//                     marginTop: "10px",
//                     background: "#F4FBFF",
//                     width: "100%",
//                     height: 50,
//                     justifyContent: "center",
//                     paddingX: "15px",
//                     borderRadius: "5px",
//                     [theme.breakpoints.up("md")]: {
//                       width: "491px  !important",
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   <ListSubheader>Software Engineer</ListSubheader>
//                   <MenuItem value={"traineSE"}>traine</MenuItem>
//                   <MenuItem value={"seniorSE"}>senior</MenuItem>
//                   <ListSubheader>hr</ListSubheader>
//                   <MenuItem value={"juniorHR"}>junior</MenuItem>
//                   <MenuItem value={"seniorHR"}>senior</MenuItem>
//                 </Select>
//               </Grid>
//               <Grid item mt={4}>
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   sx={{
//                     marginTop: "20px",
//                     marginRight: "11px",
//                     marginBottom: "19px",
//                   }}
//                 >
//                   Update
//                 </Button>
//                 <Link variant="outlined" spacing={8} sx={{ marginTop: "22px", marginBottom: "15px" }}>
//                   Discard
//                 </Link>
//               </Grid>
//             </Grid>
//           </Form>
//         </Box>
//       )
//     );
//   }
// };
