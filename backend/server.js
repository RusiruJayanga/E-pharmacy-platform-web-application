import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
//customer
import customerLoginRoutes from "./routes/user/customer/Login.js";

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
