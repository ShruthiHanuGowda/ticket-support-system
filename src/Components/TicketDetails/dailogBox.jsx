import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { DialogActions, DialogContent, TextField } from "@mui/material";
const emails = ["Open", "In Progress", "Hold", "Close"];
const department = [
  "Sales",
  "Senior",
  "HR Senior",
  "HR Junior",
  "SE Senior",
  "SE Junior",
];
export default function SimpleDialog(props) {
  const [input, setInput] = React.useState({});
  const [updateAssigneeName, setUpdateAssigneeName] = React.useState(null);
  const { onClose, selectedValue, open, id, flag, onstatusChange } = props;
  console.log(props.flag);
  const handleClose = () => {
    onClose(selectedValue);
  };
  if (props.flag === "status") {
    const handleListItemClick = async (value) => {
      await axios.put(`/ticket/Update-ticket/${id}`, {
        // name: String(input.name),
        // department: String(input.department),
        // fileupload: String(input.fileupload),
        // issuetype: String(input.issuetype),
        // message: String(input.message),
        status: String(value),
      });
      console.log(value);
      onstatusChange();
      onClose(false);
    };
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ backgroundColor: "yellow" }}>
          Update Status
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem
              button
              onClick={() => handleListItemClick(email)}
              key={email}
            >
              <ListItemText sx={{ textAlign: "center" }} primary={email} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  } else if (props.flag === "transfer") {
    const handleListItemClick = async (value) => {
      await axios.put(`/ticket/Update-ticket/${id}`, {
        // name: String(input.name),
        // department: String(value),
        // fileupload: String(input.fileupload),
        issuetype: String(value),
        // message: String(input.message),
        // status: String(input.status),
      });
      console.log(value);
      onClose(false);
    };
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ backgroundColor: "yellow" }}>
          Update Transfer
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {department.map((email) => (
            <ListItem
              button
              onClick={() => handleListItemClick(email)}
              key={email}
            >
              <ListItemText sx={{ textAlign: "center" }} primary={email} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  } else if (props.flag === "assignee") {
    const handleListItemClickName = async (value) => {
      await axios.put(`/ticket/Update-ticket/${id}`, {
        name: String(value),
        // department: String(input.department),
        // fileupload: String(input.fileupload),
        // issuetype: String(input.issuetype),
        // message: String(input.message),
        // status: String(input.status),
      });
      console.log(value);
      onstatusChange();
      onClose(false);
    };
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ backgroundColor: "yellow" }}>
          Update Assignee
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Update Assignee Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setUpdateAssigneeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={(e) => handleListItemClickName(updateAssigneeName)}
          >
            Update
          </Button>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
        </DialogActions>
        {/* <DialogTitle >
          </DialogTitle>
          <TextField type={'text'}  placeholder="Update Assignee Name"  onClick={(e) => handleListItemClick(e.target.value)} /> */}
      </Dialog>
    );
  }
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
// function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };
//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }
