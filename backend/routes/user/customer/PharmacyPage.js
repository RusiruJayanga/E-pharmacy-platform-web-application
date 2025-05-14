import express from "express";
import { getPharmacies } from "../../../controllers/user/customer/PharmacyPage.js";

const router = express.Router();

router.get("/", getPharmacies);

export default router;
