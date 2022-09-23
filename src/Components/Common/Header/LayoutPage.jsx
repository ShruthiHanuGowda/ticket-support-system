import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBarPage from "./AppBarPage";
import { SideBarPage } from "./SideBarPage";
import { Home } from "../../Home/Home";
export const LayoutPage = () => {
  const [open, setOpen] = React.useState(false);
  console.log(open);
  useEffect(() => {}, [open]);
  const [isLoggedin, setIsLoggedin] = useState(
    sessionStorage.getItem("token") ? true : false
  );

  return (
    <>
      <AppBarPage setOpen={setOpen} open={open} />
      <Grid container sx={{ display: "flex" }}>
        <Grid item xs={1}>
          <SideBarPage setOpen={setOpen} open={open} />
        </Grid>
        <Grid item xs>
          <Home loggedin={isLoggedin} />
        </Grid>
      </Grid>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box> */}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <SideBarPage setOpen={setOpen} open={open} />

        <Outlet />
      </Box> */}
    </>
  );
};
