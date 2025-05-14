import express from "express";
import { getMedicineById } from "../../../controllers/user/customer/MedicineDetails.js";

const router = express.Router();

router.get("/:id", getMedicineById);

export default router;
