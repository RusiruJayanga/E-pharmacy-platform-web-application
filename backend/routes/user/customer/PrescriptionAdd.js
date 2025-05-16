import express from "express";
import { uploadPrescription } from "../../../controllers/user/customer/PrescriptionAdd.js";

const router = express.Router();

router.post("/prescription/add", uploadPrescription);

export default router;
