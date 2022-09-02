import { Box, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import InboxIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Kadellogo from "../../../Assets/Images/kadellabslogo.png";
import { useTheme } from '@emotion/react';
//import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
 
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useMediaQuery = (query, defaultState = false) => {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

const usePrevious = (value) => {
  const ref = React.useRef(null);
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};



//------------------------------------------------
export const SideBarPage = ({setOpen,open}) => {
  // const [open, setOpen] = React.useState(true);
 
  const theme = useTheme();
  console.log(open)
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const isBigScreen = useMediaQuery("(min-width: 1140px)", false);
  const prevBigScreen = usePrevious(isBigScreen);


const logout = () => {
    // setIsLoggedin(false);
    // sessionStorage.clear();
    // navigate("/login");
  };
  const Routes = [
    // {
    //   name: "Dashboard",
    //   path: "/",
    // },
    // { name: "Manage Client", path: "/manage-client" },
    // { name: "Manage User", path: "/manage-user" },
  ];
  return (
   <Box>
    <CssBaseline />
    <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: "#F4FBFF",
          "& .MuiPaper-root": { backgroundColor: "#F4FBFF" },
        }}
      >
        <DrawerHeader style={{ backgroundColor: "#F4FBFF" }}>
          <Typography>
            <img  src={Kadellogo} alt="logo" />
          </Typography>
          <IconButton  onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Routes.map((text, index) => (
            <ListItem key={text.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={text.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText component={Link} primary={text.name} to={text.path} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List>
          {["My Profile", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <PermIdentityOutlinedIcon /> : <LogoutIcon color="error" onClick={logout} />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
   </Box>
  )
}
