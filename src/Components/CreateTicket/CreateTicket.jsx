// import {
//   Box,
//   Grid,
//   // Input,
//   InputLabel,
//   ListSubheader,
//   MenuItem,
//   Select,
//   Typography,
//   Button,
//   Link,
//   TextareaAutosize,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

// import React from "react";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
// import InputAdornment from "@mui/material/InputAdornment";
// import InputBase from "@mui/material/InputBase";
// import { styled } from "@mui/material/styles";

// import FormControl from "@mui/material/FormControl";

// //   import Radio from '@mui/material/Radio';
// //   import RadioGroup from '@mui/material/RadioGroup';
// //   import FormControlLabel from '@mui/material/FormControlLabel';
// // import FormControl from '@mui/material/FormControl';
// // import FormLabel from '@mui/material/FormLabel';

// export const CreateTicket = () => {
//   const BootstrapInput = styled(InputBase)(({ theme }) => ({
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//     "& .MuiInputBase-input": {
//       position: "abolute",
//       //   backgroundColor: theme.palette.mode === "light" ? "#D3E0E8" :  "#F4FBFF",
//       fontSize: 16,
//       width: "300px",
//       padding: "10px 12px",
//     },
//   }));

//   const theme = useTheme();
//   const matches = useMediaQuery(theme.breakpoints.down("md"));
//   return (
//     (<span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>),
//     (
//       <Box
//         component="form"
//         noValidate
//         autoComplete="off"
//         sx={{
//           width: "auto",
//           paddingX: "5",
//           [theme.breakpoints.down("md")]: {
//             paddingX: "1 !important",
//           },
//         }}
//       >
//         <Typography variant="h5" sx={{ my: 4 }}>
//           Create Ticket
//         </Typography>

//         <Grid container justify="center" spacing={4}>
//           <Grid item md={6} xs={12}>
//             <FormControl variant="standard">
//               <InputLabel shrink htmlFor="bootstrap-input">

//                 <h4 sx={{color:"black"}}> Ticket ID<span style={{ color: "red" }}>*</span></h4>
//               </InputLabel>
//               <BootstrapInput
//                 defaultValue="#1234"
//                 id="bootstrap-input"
//                 sx={{
//                   background: "#D3E0E8",
//                   width: "100%",
//                   [theme.breakpoints.up("md")]: {
//                     width: "491px  !important",
//                   },
//                 }}
//               />
//             </FormControl>

//             {/* <InputLabel >
//              Ticket ID<span style={{ color: "red" }}>*</span>
//             </InputLabel>
//             <TextField
//               placeholder="#1234"
//               sx={{
//                 background: "#D3E0E8",
//                 width: "100%",
//                 [theme.breakpoints.up("md")]: {
//                   width: "491px  !important",
//                 },
//               }}
//             /> */}
//           </Grid>

//           <Grid item md={6} xs={12}>
//             <InputLabel>
//              <h5>Issue Type <span style={{ color: "red" }}>*</span></h5>
//             </InputLabel>
//             <Select
//               defaultValue=""
//               id="grouped-select"
//               label="Grouping"
//               // placeholder="Select Position"
//               Value="Position"
//               sx={{
//                 background: "#F4FBFF",
//                 width: "100%",
//                 [theme.breakpoints.up("md")]: {
//                   width: "491px  !important",
//                 },
//               }}
//             >
//               <MenuItem value="">
//                 <em>hello</em>
//               </MenuItem>
//               <ListSubheader>Software Engineer</ListSubheader>
//               <MenuItem value={1}>traine</MenuItem>
//               <MenuItem value={2}>senior</MenuItem>
//               <ListSubheader>hr</ListSubheader>
//               <MenuItem value={3}>junior</MenuItem>
//               <MenuItem value={4}>senior</MenuItem>
//             </Select>
//           </Grid>

//           <Grid item md={6} xs={12}>
//             <FormControl variant="standard">
//               <InputLabel shrink htmlFor="bootstrap-input">
//               <h4 sx={{color:"black"}}>Full Name <span style={{ color: "red" }}>*</span></h4>
//               </InputLabel>
//               <BootstrapInput
//                 defaultValue="Full Name"
//                 id="bootstrap-input"

//                 sx={{
//                   background: "#F4FBFF",
//                   width: "100%",

//                   [theme.breakpoints.up("md")]: {
//                     width: "491px  !important",
//                   },
//                 }}
//               />
//             </FormControl>

//             {/* <InputLabel>
//               Full Name<span style={{ color: "red" }}>*</span>
//             </InputLabel>
//             <TextField
//               placeholder="Full Name"
//               sx={{
//                 background: "#F4FBFF",
//                 width: "100%",
//                 [theme.breakpoints.up("md")]: {
//                   width: "491px  !important",
//                 },
//               }}
//             /> */}
//           </Grid>

//           <Grid item md={6} xs={12}>
//             <InputLabel htmlFor="grouped-select">
//              <h5>Department <span style={{ color: "red" }}>*</span></h5>
//             </InputLabel>
//             <Select
//               Value="select "
//               id="grouped-select"
//               label="Grouping"
//               sx={{
//                 background: "#F4FBFF",
//                 width: "100%",

//                 [theme.breakpoints.up("md")]: {
//                   width: "491px ",
//                 },
//               }}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <ListSubheader>Software Engineer</ListSubheader>
//               <MenuItem value={1}>traine</MenuItem>
//               <MenuItem value={2}>senior</MenuItem>
//               <ListSubheader>hr</ListSubheader>
//               <MenuItem value={3}>junior</MenuItem>
//               <MenuItem value={4}>senior</MenuItem>
//             </Select>
//           </Grid>

//           <Grid item md={6} xs={12}>
//             <FormControl variant="standard">
//             <InputLabel htmlFor="grouped-select" >
//               <h4 sx={{color:"black"}}>Department <span style={{ color: "red" }}>*</span></h4>
//             </InputLabel>
//               <BootstrapInput
//                 defaultValue="Browser File"
//                 id="bootstrap-input"
//                 sx={{
//                   background: "#F4FBFF",
//                   width: "100%",

//                   [theme.breakpoints.up("md")]: {
//                     width: "491px  !important",
//                   },
//                 }}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <FolderOpenIcon />
//                   </InputAdornment>
//                 }
//               />
//             </FormControl>

//             {/* <InputLabel>
//               File Upload<span style={{ color: "red" }}>*</span>
//             </InputLabel>
//             <TextField
//               placeholder="Browser Files"
//               sx={{
//                 background: "#F4FBFF",
//                 width: "100%",
//                 Border:"none",
//                 [theme.breakpoints.up("md")]: {
//                   width: "491px  !important",
//                 },
//               }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <FolderOpenIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             /> */}
//           </Grid>

//           <Grid item md={6} xs={12} padding={1}>
//             <InputLabel>

//               <h5 sx={{color:"black"}}>Message <span style={{ color: "red" }}>*</span></h5>
//             </InputLabel>

//             <TextareaAutosize
//               aria-label="empty textarea"
//               placeholder="Enter here..."
//               style={{
//                 background: "#F4FBFF",
//                 width: 500,
//                 height: 100,
//                 border: "none",
//               }}
//             />
//           </Grid>
//         </Grid>

//         <Grid container>
//           <Button
//             variant="contained"
//             sx={{
//               background: "#044BA9",
//               marginTop: "20px",
//               marginRight: "11px",
//               marginBottom: "19px",
//             }}
//           >
//             Create
//           </Button>
//           <Link
//             to="#"
//             variant="outlined"
//             spacing={8}
//             sx={{ marginTop: "22px", marginBottom: "15px" }}
//           >
//             {" "}
//             Discard{" "}
//           </Link>
//         </Grid>

//       </Box>
//     )
//   );
// };

import {
  Box,
  Grid,
  // Input,
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

import FormControl from "@mui/material/FormControl";

//   import Radio from '@mui/material/Radio';
//   import RadioGroup from '@mui/material/RadioGroup';
//   import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CreateTicket = () => {
  const [personName, setPersonName] = React.useState([]);
  const [personName1, setPersonName1] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName1(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      position: "abolute",
      //   backgroundColor: theme.palette.mode === "light" ? "#D3E0E8" :  "#F4FBFF",
      fontSize: 16,
      width: "300px",
      padding: "10px 12px",
    },
  }));

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    (<span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>),
    (
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
        <Typography variant="h5" sx={{ my: 4 }}>
          Create Ticket
        </Typography>

        <Grid container justify="center" spacing={4}>
          <Grid item md={6} xs={12}>
            {/* <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                <h4 sx={{ color: "#3B3B3B" }}>
                  {" "}
                  Ticket ID<span style={{ color: "red" }}>*</span>
                </h4>
              </InputLabel>
              <BootstrapInput
                defaultValue="#1234"
                id="bootstrap-input"
                sx={{
                  background: "#D3E0E8",
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              />
            </FormControl> */}

            <InputLabel>
              Ticket ID<span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              placeholder="#1234"
              sx={{
                background: "#D3E0E8",
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  width: "491px  !important",
                },
              }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <InputLabel>
              <h5>
                Issue Type <span style={{ color: "red" }}>*</span>
              </h5>
            </InputLabel>
            <div>
              <FormControl
                sx={{
                  background: "#F4FBFF",
                  width: "100%",

                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              >
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Issue</em>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* <Select
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                // placeholder="Select Position"
                Value="Position"
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
                <MenuItem value={1}>traine</MenuItem>
                <MenuItem value={2}>senior</MenuItem>
                <ListSubheader>hr</ListSubheader>
                <MenuItem value={3}>junior</MenuItem>
                <MenuItem value={4}>senior</MenuItem>
              </Select> */}
          </Grid>

          <Grid item md={6} xs={12}>
            {/* <FormControl variant="standard">
              <InputLabel shrink htmlFor="bootstrap-input">
                <h4 sx={{ color: "black" }}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </h4>
              </InputLabel>
              <BootstrapInput
                defaultValue="Full Name"
                id="bootstrap-input"
                sx={{
                  background: "#F4FBFF",
                  width: "100%",

                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              />
            </FormControl> */}

            <InputLabel>
              Full Name<span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              placeholder="Full Name"
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
              <h5>
                Department <span style={{ color: "red" }}>*</span>
              </h5>
            </InputLabel>

            <div>
              <FormControl
                sx={{
                  background: "#F4FBFF",
                  width: "100%",
                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
              >
                <Select
                  multiple
                  displayEmpty
                  value={personName1}
                  onChange={handleChange1}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select Department</em>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* <Select
              Value="select "
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
              <MenuItem value={1}>traine</MenuItem>
              <MenuItem value={2}>senior</MenuItem>
              <ListSubheader>hr</ListSubheader>
              <MenuItem value={3}>junior</MenuItem>
              <MenuItem value={4}>senior</MenuItem>
            </Select> */}
          </Grid>

          <Grid item md={6} xs={12}>
            {/* <FormControl variant="standard">
               <Box>
              <InputLabel htmlFor="grouped-select">
                <h4 sx={{ color: "black" }}>
                  File Upload <span style={{ color: "red" }}>*</span>
                </h4>
                
              </InputLabel>
              <BootstrapInput
                defaultValue="Browser File"
                id="bootstrap-input"
               
                sx={{
                  background: "#F4FBFF",
                  width: "100%",

                  [theme.breakpoints.up("md")]: {
                    width: "491px  !important",
                  },
                }}
                    InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FolderOpenIcon />
                      </InputAdornment>
                    ),
                  }}
               
                       
                
                
              />
            <FolderOpenIcon />
            </Box>       
            </FormControl >
 */}

            <InputLabel>
              File Upload<span style={{ color: "red" }}>*</span>
            </InputLabel>
            <TextField
              placeholder="Browser Files"
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
                  <InputAdornment position="end">
                    <FolderOpenIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            
          </Grid>

          <Grid item md={6} xs={12} padding={1}>
            <InputLabel>
              <h5 sx={{ color: "black" }}>
                Message <span style={{ color: "red" }}>*</span>
              </h5>
            </InputLabel>

            <TextareaAutosize
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
        </Grid>

        <Grid container>
          <Button
            variant="contained"
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
      </Box>
    )
  );
};
