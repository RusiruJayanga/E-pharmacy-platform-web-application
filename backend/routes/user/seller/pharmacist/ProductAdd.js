import express from "express";
import { addProduct } from "../../../../controllers/user/seller/pharmacist/ProductAdd.js";

const router = express.Router();

router.post("/add", addProduct);

export default router;
