import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import axios from "axios";

const emails = ["Open", "In Progress", "Hold", "Close"];
export default function SimpleDialog(props) {
    const [input ,setInput]=React.useState({})
  const { onClose, selectedValue, open,id } = props;
  React.useEffect(() => {
    const fetchUserData = async () => {
      return await axios
        .get(`/getSingleTicket/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInput(data.ticket)
        });
    }
    fetchUserData()
  }, [])

console.log(props.id)
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async(value) => {
    await axios.put(`/ticket/Update-ticket/${id}`,{
        name: String(input.name),
        department: String(input.department),
        fileupload: String(input.fileupload),
        issuetype: String(input.issuetype),
        message: String(input.message),
        status: String(value),
    })
    console.log(value)
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
