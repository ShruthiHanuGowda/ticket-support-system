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
  
  } from "@mui/material";
  import { useTheme } from '@mui/material/styles';
  import useMediaQuery from '@mui/material/useMediaQuery';
  
  import React from "react";
  
  
  export const CreateClient = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down( 'md'));
    return (
     
      <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>,
        <Box component="form" noValidate autoComplete="off" sx={{width:'auto',paddingX:"5", [theme.breakpoints.down('md')]: {
          paddingX:'1 !important'
        }}} >
          <Typography variant="h5" sx={{ my: 4 }}>
            Create Client
          </Typography>
  
          <Grid container justify="center" spacing={4} >
            <Grid item md={6} xs={12}>
              <InputLabel>Full Name <span style={{color:'red'}}>*</span></InputLabel>
              <TextField
                
                placeholder="Full Name"
                
                sx={{ background: "#F4FBFF", width:'100%', [theme.breakpoints.up('md')]: {
                  width: '491px  !important'
                } }}
              />
            </Grid>
  
            <Grid item md={6} xs={12}>
              <InputLabel >Email <span style={{color:'red'}}>*</span></InputLabel>
              <TextField
                placeholder="Email"
                sx={{ background: "#F4FBFF", width:'100%', [theme.breakpoints.up('md')]: {
                  width: '491px  !important'
                }}}
              />
            </Grid>
  
            <Grid item md={6} xs={12} >
              <InputLabel htmlFor="grouped-select" >Position <span style={{color:'red'}}>*</span></InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                placeholder="Select Position"
                sx={{ background: "#F4FBFF",width:'100%', [theme.breakpoints.up('md')]: {
                  width: '491px  '
                } }}
                
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
  
            <Grid item md={6} xs={12}>
              <InputLabel htmlFor="grouped-select" >Department <span style={{color:'red'}}>*</span></InputLabel>
              <Select
                defaultValue=""
               
                id="grouped-select"
                label="Grouping"
                sx={{ background: "#F4FBFF",width: "100%",  [theme.breakpoints.up('md')]: {
                  width: '491px '
                } }}
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
            <Grid
          item
          md={6}
          xs={2}
          sx={{
            marginTop: "30px",
            marginLeft: "18px",
          }}
        >
          <InputLabel>
            Access to Ticket <span style={{ color: "red" }}>*</span>
          </InputLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{
              width: "100%",
              [theme.breakpoints.up("md")]: {
                width: "491px ",
              },
            }}
          >
            <FormControlLabel value="view" control={<Radio />} label="View" />
            <FormControlLabel value="edit" control={<Radio />} label="Edit" />
            <FormControlLabel
              value="transfer"
              control={<Radio />}
              label="Transfer"
            />
          </RadioGroup>
        </Grid>

          </Grid>
          <Grid container mt={4}>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginRight: "11px",
              marginBottom: "19px"
             
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
     
    );
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  