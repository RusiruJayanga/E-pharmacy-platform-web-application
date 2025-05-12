import React from "react";
import { Route, Routes } from "react-router-dom";
//scroll to top
import ScrollToTop from "../src/config/ScrollToTop";
//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//main components
import Footer from "./components/user/common/footer/Footer";
import Navigation_bar_head from "./components/user/customer/navigation/Navigation_bar_head";
import Navigation_bar from "./components/user/customer/navigation/Navigation_bar";
import Navigation_bar_pharmacist from "./components/user/seller/pharmacist/navigation/Navigation_bar";
import Navigation_bar_doctor from "./components/user/seller/doctor/navigation/Navigation_bar";
import Navigation_bar_lab from "./components/user/seller/lab/navigation/Navigation_bar";
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
import Seller_info from "./pages/user/customer/info/Seller_info";
import Cart from "./pages/user/customer/cart/Cart";
import Search from "./pages/user/customer/search/Search";
import Account from "./pages/user/customer/account/Account";
import Request from "./pages/user/customer/request/Request";
//seller pharmacist pages
import Home_pharmacist_seller from "./pages/user/seller/pharmacist/home/Home";
import Store_pharmacist_seller from "./pages/user/seller/pharmacist/store/Store";
import Product_pharmacist_seller from "./pages/user/seller/pharmacist/product/Product";
import Request_pharmacist_seller from "./pages/user/seller/pharmacist/request/Request";
import Orders_pharmacist_seller from "./pages/user/seller/pharmacist/orders/Orders";
import Account_pharmacist_seller from "./pages/user/seller/pharmacist/account/Account";
import Login_pharmacist_seller from "./pages/user/seller/pharmacist/login/Login";
//seller doctor pages
import Home_doctor_seller from "./pages/user/seller/doctor/home/Home";
import Ads_doctor_seller from "./pages/user/seller/doctor/ads/Ads";
import Appointments_doctor_seller from "./pages/user/seller/doctor/appointments/Appointments";
import Account_doctor_seller from "./pages/user/seller/doctor/account/Account";
import Login_doctor_seller from "./pages/user/seller/doctor/login/Login";
//lab pages
import Home_lab_seller from "./pages/user/seller/lab/home/Home";
import Ads_lab_seller from "./pages/user/seller/lab/ads/Ads";
import Appointments_lab_seller from "./pages/user/seller/lab/appointments/Appointments";
import Account_lab_seller from "./pages/user/seller/lab/account/Account";
import Login_lab_seller from "./pages/user/seller/lab/login/Login";

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <ToastContainer
        position="top-center"
        autoClose={3500}
        theme="dark"
        style={{ zIndex: 10010 }}
      />
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
          "Seller_info",
          "Cart",
          "Search",
          "Account",
          "Request",
        ].map((path) => (
          <Route path={path} element={<Navigation_bar />} />
        ))}
        {/* seller pharmacist navigation bar */}
        {[
          "Home_pharmacist",
          "Store_pharmacist",
          "Product_pharmacist",
          "Orders_pharmacist",
          "Request_pharmacist",
          "Account_pharmacist",
        ].map((path) => (
          <Route path={path} element={<Navigation_bar_pharmacist />} />
        ))}
        {/* seller doctor navigation bar */}
        {[
          "Home_doctor",
          "Ads_doctor",
          "Appointments_doctor",
          "Account_doctor",
        ].map((path) => (
          <Route path={path} element={<Navigation_bar_doctor />} />
        ))}
        {/* seller lab navigation bar */}
        {["Home_lab", "Ads_lab", "Appointments_lab", "Account_lab"].map(
          (path) => (
            <Route path={path} element={<Navigation_bar_lab />} />
          )
        )}
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
        <Route path="/Seller_info" element={<Seller_info />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Request" element={<Request />} />
      </Routes>
      {/* seller pharmacist pages */}
      <Routes>
        <Route path="/Home_pharmacist" element={<Home_pharmacist_seller />} />
        <Route path="/Store_pharmacist" element={<Store_pharmacist_seller />} />
        <Route
          path="/Product_pharmacist"
          element={<Product_pharmacist_seller />}
        />
        <Route
          path="/Orders_pharmacist"
          element={<Orders_pharmacist_seller />}
        />
        <Route
          path="/Account_pharmacist"
          element={<Account_pharmacist_seller />}
        />
        <Route
          path="/Request_pharmacist"
          element={<Request_pharmacist_seller />}
        />
        <Route path="/Pharmacist_login" element={<Login_pharmacist_seller />} />
      </Routes>
      {/* seller doctor pages */}
      <Routes>
        <Route path="/Home_doctor" element={<Home_doctor_seller />} />
        <Route path="/Ads_doctor" element={<Ads_doctor_seller />} />
        <Route
          path="/Appointments_doctor"
          element={<Appointments_doctor_seller />}
        />
        <Route path="/Account_doctor" element={<Account_doctor_seller />} />
        <Route path="/Doctor_login" element={<Login_doctor_seller />} />
      </Routes>
      {/* seller lab pages */}
      <Routes>
        <Route path="/Home_lab" element={<Home_lab_seller />} />
        <Route path="/Ads_lab" element={<Ads_lab_seller />} />
        <Route path="/Appointments_lab" element={<Appointments_lab_seller />} />
        <Route path="/Account_lab" element={<Account_lab_seller />} />
        <Route path="/Lab_login" element={<Login_lab_seller />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
