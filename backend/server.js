import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
//customer
import customerLoginRoutes from "./routes/user/customer/Login.js";
import customerRegisterRoutes from "./routes/user/customer/Signup.js";
//seller
import sellerRequestRoutes from "./routes/user/seller/common/Request.js";

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
//seller
app.use("/api/auth", sellerRequestRoutes);
