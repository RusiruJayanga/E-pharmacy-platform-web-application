import React from "react";
import { Route, Routes } from "react-router-dom";
//scroll to top
import ScrollToTop from "../src/config/ScrollToTop";
//main components
import Footer from "./components/user/common/footer/Footer";
import Navigation_bar_head from "./components/user/customer/navigation/Navigation_bar_head";
import Navigation_bar from "./components/user/customer/navigation/Navigation_bar";
//pages
//customer pages
import Home from "./pages/user/customer/home/Home";
import Medicines from "./pages/user/customer/medicines/Medicines";
import Pharmacies from "./pages/user/customer/pharmacies/Pharmacies";
import Doctors from "./pages/user/customer/doctors/Doctors";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navigation_bar_head />
      {/* navigation */}
      <Routes>
        {/* customer navigation bar */}
        {["", "Medicines", "Pharmacies", "Doctors"].map((path) => (
          <Route path={path} element={<Navigation_bar />} />
        ))}
      </Routes>
      {/* pages */}
      {/* customer pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Medicines" element={<Medicines />} />
        <Route path="/Pharmacies" element={<Pharmacies />} />
        <Route path="/Doctors" element={<Doctors />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
