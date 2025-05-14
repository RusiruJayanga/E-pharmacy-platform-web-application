import express from "express";
import { getPharmacyById } from "../../../controllers/user/customer/PharmacyDetails.js";

const router = express.Router();

router.get("/:id", getPharmacyById);

export default router;
