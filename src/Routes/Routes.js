import React, { useState } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import { Header } from '../Components/Common/Header/Header'
// import { Footer } from '../Components/Common/Footer/Footer'
import { Home } from '../Components/Home/Home'
import { About } from '../Components/About/About'
import { ManageUser } from '../Components/ManageUser/ManageEndUser'
import { ManageClient } from '../Components/ManageClient/ManageClient'
import { Login } from '../Components/AuthPage/LoginPage/login'

export const Router = () => {
  const [isLoggedin, setIsLoggedin] = useState(false)
  return (
    <>
      <Switch>
        <Route
          path="/login"
          exact
          element={<Login setIsLoggedin={setIsLoggedin} />}
        />
        <Route
          path="/"
          exact
          element={<Header setIsLoggedin={setIsLoggedin} />}
        >
          <Route path="/" exact element={<Home loggedin={isLoggedin} />} />
          <Route path="/manage-user" exact element={<ManageUser loggedin={isLoggedin}/>} />
          <Route path="/manage-client" exact element={<ManageClient loggedin={isLoggedin}/>} />
        </Route>
        <Route path="/about" exact element={<About />} />
      </Switch>
      {/* <Footer /> */}
    </>
  )
}
