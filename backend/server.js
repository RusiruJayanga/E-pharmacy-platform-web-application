import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  __dirname,
  "config/vision-ocr-sa.json"
);
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
import customerPaymentRoutes from "./routes/user/customer/PaymentSandBox.js";
import customerOrderRoutes from "./routes/user/customer/OrderPage.js";
import customerAppointmentRoutes from "./routes/user/customer/AppointmentPage.js";
import customerRequestRoutes from "./routes/user/customer/RequestPage.js";
import CustomerAccountDetailsRoutes from "./routes/user/customer/AccountDetails.js";
import customerSaveRoutes from "./routes/user/customer/Save.js";
import customerMedicineDetailsRoutes from "./routes/user/customer/MedicineDetails.js";
import customerAccessoryDetailsRoutes from "./routes/user/customer/AccessoryDetails.js";
import customerPharmacyDetailsRoutes from "./routes/user/customer/PharmacyDetails.js";
import customerDoctorDetailsRoutes from "./routes/user/customer/DoctorDetails.js";
import customerLabDetailsRoutes from "./routes/user/customer/LabDetails.js";
import customerPharmacyPrescriptionRoutes from "./routes/user/customer/PrescriptionAdd.js";
import customerDoctorAppointmentRoutes from "./routes/user/customer/DoctorAppointment.js";
import customerSearchFetchRoutes from "./routes/user/customer/SearchPage.js";
import customerPrescriptionDetectRoutes from "./controllers/user/customer/PrescriptionSearch.js";
import customerReviewRoutes from "./routes/user/customer/Review.js";
//seller
import sellerRequestRoutes from "./routes/user/seller/common/Request.js";
//pharmacist
import pharmacistLoginRoutes from "./routes/user/seller/pharmacist/Login.js";
import pharmacistProductAdd from "./routes/user/seller/pharmacist/ProductAdd.js";
import pharmacistProductStore from "./routes/user/seller/pharmacist/Store.js";
import pharmacistOrderRoutes from "./routes/user/seller/pharmacist/OrderPage.js";
import pharmacistRequestRoutes from "./routes/user/seller/pharmacist/RequestPage.js";
import pharmacistProductEdit from "./routes/user/seller/pharmacist/EditPage.js";
import pharmacistHomePage from "./routes/user/seller/pharmacist/HomePage.js";
//doctor
import doctorLoginRoutes from "./routes/user/seller/doctor/Login.js";
import doctorHomeRoutes from "./routes/user/seller/doctor/DoctorHome.js";
import doctorAppointmentRoutes from "./routes/user/seller/doctor/AppointmentDetails.js";
//lab
import labLoginRoutes from "./routes/user/seller/lab/Login.js";
import labHomeRoutes from "./routes/user/seller/lab/LabHome.js";
import labAppointmentRoutes from "./routes/user/seller/lab/AppointmentDetails.js";
//admin
import adminHomeRoutes from "./routes/admin/HomePage.js";
import adminCustomerRoutes from "./routes/admin/CustomerPage.js";
import adminDoctorRoutes from "./routes/admin/DoctorsPage.js";
import adminLabRoutes from "./routes/admin/LabsPage.js";
import adminPharmacyRoutes from "./routes/admin/PharmaciesPage.js";
//file upload
import uploadRouter from "./config/UploadFile.js";
//admin contact
import admiContact from "./routes/user/common/Contact.js";

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
app.use("/api/orders", customerOrderRoutes);
app.use("/api/appointments", customerAppointmentRoutes);
app.use("/api/request", customerRequestRoutes);
app.use("/api/account", CustomerAccountDetailsRoutes);
app.use("/api/payment", customerPaymentRoutes);
app.use("/api/save", customerSaveRoutes);
app.use("/api/medicines", customerMedicineDetailsRoutes);
app.use("/api/accessories", customerAccessoryDetailsRoutes);
app.use("/api/pharmacies", customerPharmacyDetailsRoutes);
app.use("/api/doctors", customerDoctorDetailsRoutes);
app.use("/api/labs", customerLabDetailsRoutes);
app.use("/api/pharmacies", customerPharmacyPrescriptionRoutes);
app.use("/api/appointments", customerDoctorAppointmentRoutes);
app.use("/api/search", customerSearchFetchRoutes);
app.use("/api/prescription", customerPrescriptionDetectRoutes);
app.use("/api/reviews", customerReviewRoutes);
//seller
app.use("/api/auth", sellerRequestRoutes);
//pharmacist
app.use("/api/auth", pharmacistLoginRoutes);
app.use("/api/product", pharmacistProductAdd);
app.use("/api/product/store", pharmacistProductStore);
app.use("/api/orders", pharmacistOrderRoutes);
app.use("/api/request", pharmacistRequestRoutes);
app.use("/api/accessories", pharmacistProductEdit);
app.use("/api/medicines", pharmacistProductEdit);
app.use("/api/pharmacist/home", pharmacistHomePage);
//doctor
app.use("/api/auth", doctorLoginRoutes);
app.use("/api/doctor", doctorHomeRoutes);
app.use("/api/appointment-doctor", doctorAppointmentRoutes);
//lab
app.use("/api/auth", labLoginRoutes);
app.use("/api/lab", labHomeRoutes);
app.use("/api/appointment-lab", labAppointmentRoutes);
//admin
app.use("/api/admin", adminHomeRoutes);
app.use("/api/admin", adminCustomerRoutes);
app.use("/api/admin", adminDoctorRoutes);
app.use("/api/admin", adminLabRoutes);
app.use("/api/admin", adminPharmacyRoutes);
//file upload
app.use("/api/files", uploadRouter);
//admin contact
app.use("/api/contact", admiContact);
