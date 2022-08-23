import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import { Header } from "../Components/Common/Header/Header";
import { Footer } from "../Components/Common/Footer/Footer";
import { Home } from "../Components/Home/Home";
import { About } from "../Components/About/About";
import { ManageUser } from "../Components/ManageUser/ManageEndUser";
import { ManageClient } from "../Components/ManageClient/ManageClient";
import { CreateClient } from "../Components/CreateClient/CreateClient";
import { CreateEndUser } from "../Components/CreateEndUser/CreateEndUser";
import { TicketDetails } from "../Components/TicketDetails/TicketDetails";
export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact element={<Header />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/manage-user/create-enduser" exact  element={<CreateEndUser />} />
          <Route path="/manage-user" exact element={<ManageUser />}>
           
          </Route>
          <Route path="/manage-client" exact element={<ManageClient />} />
          <Route path="/manage-client/create-client" exact element={<CreateClient />} />

          <Route path="/ticket-details" exact element={<TicketDetails />} />
          <Route path="/manage-user/create-enduser" exact  element={<CreateEndUser />} />
        </Route>
        <Route path="/about" exact element={<About />} />
      </Switch>
      <Footer />
    </>
  );
};
