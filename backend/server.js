import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
//customer
import customerLoginRoutes from "./routes/user/customer/Login.js";
import customerRegisterRoutes from "./routes/user/customer/Signup.js";
import customerMedicineRoutes from "./routes/user/customer/MedicinePage.js";
import customerAccessoryRoutes from "./routes/user/customer/AccessoryPage.js";
import customerDoctorRoutes from "./routes/user/customer/DoctorPage.js";
import customerLabRoutes from "./routes/user/customer/LabPage.js";
import customerPharmacyRoutes from "./routes/user/customer/PharmacyPage.js";
import customerHomePageRoutes from "./routes/user/customer/HomePage.js";
import customerCartRoutes from "./routes/user/customer/Cart.js";
import customerSaveRoutes from "./routes/user/customer/Save.js";
import customerMedicineDetailsRoutes from "./routes/user/customer/MedicineDetails.js";
import customerAccessoryDetailsRoutes from "./routes/user/customer/AccessoryDetails.js";
import customerPharmacyDetailsRoutes from "./routes/user/customer/PharmacyDetails.js";
import customerDoctorDetailsRoutes from "./routes/user/customer/DoctorDetails.js";
import customerLabDetailsRoutes from "./routes/user/customer/LabDetails.js";
//seller
import sellerRequestRoutes from "./routes/user/seller/common/Request.js";
//pharmacist
import pharmacistLoginRoutes from "./routes/user/seller/pharmacist/Login.js";
import pharmacistProductAdd from "./routes/user/seller/pharmacist/ProductAdd.js";
import pharmacistProductStore from "./routes/user/seller/pharmacist/Store.js";
//doctor
import doctorLoginRoutes from "./routes/user/seller/doctor/Login.js";
//lab
import labLoginRoutes from "./routes/user/seller/lab/Login.js";
//file upload
import uploadRouter from "./config/UploadFile.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//db connection
connectDB();

app.get("/", (req, res) => {
  res.send("Api Connected !");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//API routes
//customer
app.use("/api/auth", customerLoginRoutes);
app.use("/api/auth", customerRegisterRoutes);
app.use("/api/home", customerHomePageRoutes);
app.use("/api/medicines", customerMedicineRoutes);
app.use("/api/accessories", customerAccessoryRoutes);
app.use("/api/pharmacies", customerPharmacyRoutes);
app.use("/api/doctors", customerDoctorRoutes);
app.use("/api/labs", customerLabRoutes);
app.use("/api/cart", customerCartRoutes);
app.use("/api/save", customerSaveRoutes);
app.use("/api/medicines", customerMedicineDetailsRoutes);
app.use("/api/accessories", customerAccessoryDetailsRoutes);
app.use("/api/pharmacies", customerPharmacyDetailsRoutes);
app.use("/api/doctors", customerDoctorDetailsRoutes);
app.use("/api/labs", customerLabDetailsRoutes);
//seller
app.use("/api/auth", sellerRequestRoutes);
//pharmacist
app.use("/api/auth", pharmacistLoginRoutes);
app.use("/api/product", pharmacistProductAdd);
app.use("/api/product/store", pharmacistProductStore);
//doctor
app.use("/api/auth", doctorLoginRoutes);
//lab
app.use("/api/auth", labLoginRoutes);
//file upload
app.use("/api/files", uploadRouter);
