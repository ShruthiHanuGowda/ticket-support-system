import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import { Header } from '../Components/Common/Header/Header';
import { Footer } from '../Components/Common/Footer/Footer';
import { Home } from '../Components/Home/Home';
import { About } from '../Components/About/About';

export const Router = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
      </Switch>
      <Footer />
    </>
  );
};
