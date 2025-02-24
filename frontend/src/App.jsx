import React from "react";
import { Route, Routes } from "react-router-dom";
//main components
import Footer from "./components/user/common/footer/Footer";
import Navigation_bar_head from "./components/user/customer/navigation/Navigation_bar_head";
import Navigation_bar from "./components/user/customer/navigation/Navigation_bar";

const App = () => {
  return (
    <div>
      <Navigation_bar_head />
      <Navigation_bar />
      <Footer />
    </div>
  );
};

export default App;
