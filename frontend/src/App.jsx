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
import Lab_test from "./pages/user/customer/lab/Lab";
import Accessories from "./pages/user/customer/accessories/Accessories";
import Medicines_details from "./pages/user/customer/details/Medicines_details";
import Pharmacies_details from "./pages/user/customer/details/Pharmacies_details";
import Doctors_details from "./pages/user/customer/details/Doctors_details";
import Lab_details from "./pages/user/customer/details/Lab_details";
import Accessories_details from "./pages/user/customer/details/Accessories_details";
import Save from "./pages/user/customer/save/Save";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navigation_bar_head />
      {/* navigation */}
      <Routes>
        {/* customer navigation bar */}
        {[
          "",
          "Medicines",
          "Pharmacies",
          "Doctors",
          "Lab_Tests",
          "Accessories",
          "Medicines_details",
          "Pharmacies_details",
          "Doctors_details",
          "Lab_details",
          "Accessories_details",
          "Save",
        ].map((path) => (
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
        <Route path="/Lab_Tests" element={<Lab_test />} />
        <Route path="/Accessories" element={<Accessories />} />
        <Route path="/Medicines_details" element={<Medicines_details />} />
        <Route path="/Pharmacies_details" element={<Pharmacies_details />} />
        <Route path="/Doctors_details" element={<Doctors_details />} />
        <Route path="/Lab_details" element={<Lab_details />} />
        <Route path="/Accessories_details" element={<Accessories_details />} />
        <Route path="/Save" element={<Save />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
