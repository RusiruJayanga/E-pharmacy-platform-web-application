import React from "react";
import { Route, Routes } from "react-router-dom";
//main components
import Footer from "./components/user/common/footer/Footer";
import Navigation_bar_head from "./components/user/customer/navigation/Navigation_bar_head";
import Navigation_bar from "./components/user/customer/navigation/Navigation_bar";
//pages
//customer pages
import Home from "./pages/user/customer/home/Home";

const App = () => {
  return (
    <div>
      <Navigation_bar_head />
      <Navigation_bar />
      <Home />
    </div>
  );
};

export default App;
