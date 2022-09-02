import * as React from "react";
import { Box } from '@mui/system';
import {  CssBaseline, IconButton, Toolbar, Tooltip, Avatar, InputBase, Menu, MenuItem, Typography, Button } from '@mui/material';
import MuiAppBar from "@mui/material/AppBar";
// import Search from '@mui/icons-material/Search';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import InboxIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Kadellogo from "../../../Assets/Images/kadellabslogo.png";
import { styled, useTheme } from "@mui/material/styles";
import Kl from "../../../Assets/Images/KL.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";


const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// ---------for search button-----

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F4FBFF",
  "&:hover": {
    backgroundColor: "#F4FBFF",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "70%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  menuPaper: {
    backgroundColor: "lightblue",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));


//----------------------------------------------
const AppBarPage = ({setOpen,open}) => {
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  console.log(open)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
   // -------for Avatar -------
 const [anchorElUser, setAnchorElUser] = React.useState(null);

 const handleOpenUserMenu = (event) => {
   setAnchorElUser(event.currentTarget);
 };

 const handleCloseUserMenu = () => {
   setAnchorElUser(null);
 };
  return (
    <Box sx={{ display: "-webkit-Box" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ paddingLeft: "10px", background: "#F4FBFF" }}>
        <Toolbar style={{ paddingLeft: "0px" }}>
          <img style={{ ...(open && { display: "none" }) }} src={Kl} alt="logo" />
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              marginLeft: 0.5,
              color: "#044BA9",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 0, position: "absolute", right: "0px" }}>
            <Button sx={{ color: "#777777" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
              </Search>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, position: "absolute", right: "20px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
                <ArrowDropDownIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              // anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      </Box>
  )
}

export default AppBarPage