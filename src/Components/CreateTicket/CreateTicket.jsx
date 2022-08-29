import * as React from "react";
import { styled, TextField, Typography, Button } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const currencies = [
  {
    value: "",
    label: "",
  },
  {
    value: "USD",
    label: "HR",
  },
  {
    value: "EUR",
    label: "Account",
  },
  {
    value: "BTC",
    label: "Developer",
  },
  {
    value: "JPY",
    label: "QA",
  },
];
const currencies1 = [
  {
    value: "",
    label: "",
  },
  {
    value: "USD",
    label: "HR",
  },
  {
    value: "EUR",
    label: "Account",
  },
  {
    value: "BTC",
    label: "Developer",
  },
  {
    value: "JPY",
    label: "QA",
  },
];

const CreateTicket=()=> {
  const [currency, setCurrency] = React.useState("");
  const [currency1, setCurrency1] = React.useState("");

  const handleChange1= (event) => {
    setCurrency1(event.target.value);
   
  };
  const handleChange = (event) => {
    setCurrency(event.target.value);
  }
  
  return (
    <Box sx={{ width: "100%", background: "#F4FBFF" }}>
      <Typography>Create Ticket</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} style={{ marginTop: 30 }}>
          <Typography>Full Name</Typography>
          <TextField style={{ width: 500 }} label="Full Name" />
        </Grid> <br />
        <Grid item xs={6} style={{ marginTop: 30 }}>
          <Typography>Issue Type</Typography>
          <TextField
            style={{ width: 500 }}
            id="outlined-select-currency-native"
            select
            label=""
            value={currency1}
            onChange={handleChange1}
            SelectProps={{
              native: true,
            }}
          >
            {currencies1.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid> <br />
        <Grid item xs={6}>
          <Typography>Department</Typography>
          <TextField
            style={{ width: 500 }}
            id="outlined-select-currency-native"
            select
            label=""
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid> <br />
        <Grid item xs={6}>
          <Typography>Full Name</Typography>
          <TextField
            style={{ width: 500 }}
            label=""
            Icon={<UploadFileIcon style={{marginLeft: 30}} />}
            Upload File
              type="file"
              hidden
            
          />
        </Grid> <br />
        <Grid item xs={6}>
          <Typography>Message</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Enter Text"
            style={{ width: 495 }}
          />
        </Grid> <br />
      </Grid>
      <Button style={{ marginTop: 10 }} variant="contained">
        Create
      </Button>
      <Button style={{ marginLeft: 20, marginTop: 10 }} variant="outlined">
        Discard
      </Button>
    </Box>
  );
};
export default CreateTicket;
