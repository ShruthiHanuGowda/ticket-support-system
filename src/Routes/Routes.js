import React, { useEffect, useState } from "react";
import { Routes as Switch, Route } from "react-router-dom";

import { Header } from "../Components/Common/Header/Header";
// import { Footer } from "../Components/Common/Footer/Footer"
import { Home } from "../Components/Home/Home";
import { About } from "../Components/About/About";
import { ManageUser } from "../Components/ManageUser/ManageEndUser";
import { ManageClient } from "../Components/ManageClient/ManageClient";
import { Login } from "../Components/AuthPage/LoginPage/login";
import { CreateClient } from "../Components/CreateClient/CreateClient";
import { CreateEndUser } from "../Components/CreateEndUser/CreateEndUser";
import { TicketDetails } from "../Components/TicketDetails/TicketDetails";
import { CreateTicket } from "../Components/CreateTicket/CreateTicket";
import RequireAuth from "../Components/Common/RequireAuth";

export const Router = () => {
  const [loginUserData, setloginUserData] = useState({});
  const [isLoggedin, setIsLoggedin] = useState(sessionStorage.getItem("token") ? true : false);
  useEffect(() => {
    getRole();
  }, []);

  const getRole = () => {
    setloginUserData(sessionStorage.getItem("loginUserData"));
  };

  // const [isclient , setIsClient] =useState(sessionStorage.getItem('role')=='client'?true:false)
  // if(sessionStorage.getItem('loginUserData')){
  return (
    <>

      {/* <Switch>
  <Route path="/" exact element={<Login />} />
  <Route path="/dashboard" exact element={<Home loggedin={isLoggedin} />} />
  <Route path="/create-ticket" exact element={<CreateTicket />} />
  <Route path="/client-dashboard" exact element={<Home loggedin={isLoggedin} />} />
</Switch> */}

      {/* <Switch>
        <Route path="/" exact element={<Login />}/>
         <Route path="/" exact element={<Header setIsLoggedin={setIsLoggedin} />}>
          <Route path="/dashboard" exact element={<Home loggedin={isLoggedin} />} />
          <Route path="/manage-user" exact element={<ManageUser loggedin={isLoggedin}  />}></Route>
          <Route path="/manage-client" exact element={<ManageClient loggedin={isLoggedin} />}/>
          <Route path="/manage-client/create-client" exact element={<CreateClient />} />
          <Route path="/ticket-details" exact element={<TicketDetails />} />
          <Route path="/manage-user/create-enduser" exact element={<CreateEndUser />}/>
          <Route path="/create-enduser/:id" exact element={<CreateEndUser />}/> 
          <Route path="/create-ticket" exact element={<CreateTicket loggedin={isLoggedin}/>} />
        </Route>     

       

      </Switch> */}

      <Switch>
        {/* public routes */}
        <Route path="/" exact element={<Login />} />
        <Route path="/" element={<Header setIsLoggedin={setIsLoggedin} />}>


          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/dashboard" exact element={<Home loggedin={isLoggedin} />} />
            <Route path="/manage-user" exact element={<ManageUser loggedin={isLoggedin} />} />
            <Route path="/manage-client" exact element={<ManageClient loggedin={isLoggedin} />} />
            <Route path="/manage-client/create-client" exact element={<CreateClient />} />
            <Route path="/manage-client/create-client/:id" exact element={<CreateClient />} />
            {/* <Route path="/ticket-details" exact element={<TicketDetails />} /> */}
            <Route path="/manage-user/create-enduser" exact element={<CreateEndUser />} />
            <Route path="/create-enduser/:id" exact element={<CreateEndUser />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['user']} />}>
            <Route path="/create-ticket" exact element={<CreateTicket loggedin={isLoggedin} />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['client']} />}>
            <Route path="/client-dashboard" exact element={<Home loggedin={isLoggedin} />} />
            {/* <Route path="/ticket-details" exact element={<TicketDetails />} /> */}
          </Route>
          <Route element={<RequireAuth allowedRoles={['client', 'admin']} />}>
            <Route path="/ticket-details" exact element={<TicketDetails />} />
          </Route>
        </Route>

      </Switch>





      {/*----------------------- for comment */}
      {/* {
        loginUSerData.role==='admin' ?
        <Switch>
        <Route path="/" exact element={<Header setIsLoggedin={setIsLoggedin} />}>
          <Route path="/dashboard" exact element={<Home loggedin={isLoggedin} />} />
          <Route path="/manage-user" exact element={<ManageUser loggedin={isLoggedin}  />}></Route>
          <Route path="/manage-client" exact element={<ManageClient loggedin={isLoggedin}  />}/>
          <Route path="/manage-client/create-client" exact element={<CreateClient />} />
          <Route path="/ticket-details" exact element={<TicketDetails />} />
          <Route path="/manage-user/create-enduser" exact element={<CreateEndUser />}/>
          <Route path="/create-enduser/:id" exact element={<CreateEndUser />}/> 
          <Route path="/create-ticket" exact element={<CreateTicket loggedin={isLoggedin}/>} />
         

        </Route>
        </Switch>
      : loginUSerData.role==='user' ?
      <Switch>
        <Route path="/"  exact element={<Header setIsLoggedin={setIsLoggedin} />}>
        
              <Route path="/" exact element={<CreateTicket loggedin={isLoggedin}/>} />
             

        </Route>
        </Switch>
      :loginUSerData.role==='client' ?
      <Switch>
      <Route path="/" exact element={<Header setIsLoggedin={setIsLoggedin} />}>
        <Route path="/" exact element={<Home loggedin={isLoggedin} />} />
        <Route path="/ticket-details" exact element={<TicketDetails />} />

      </Route>
      </Switch>
      : 
      <Switch>
      <Route path="/login" exact element={<Login setIsLoggedin={setIsLoggedin}  />}/>
      </Switch>
      } */}

      {/* <Footer /> */}
    </>
    // )}else{
    //   return (

    //     <Switch>
    //     <Route path="/" exact element={<Login setIsLoggedin={setIsLoggedin}  />}/>
    //     </Switch>
    //   );
    // }
  );
};
