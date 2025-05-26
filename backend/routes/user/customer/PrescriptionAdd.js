import express from "express";
import { uploadPrescription } from "../../../controllers/user/customer/PrescriptionAdd.js";
import { uploadLabPrescription } from "../../../controllers/user/customer/LabAppointment.js";

const router = express.Router();

router.post("/prescription/add", uploadPrescription);
router.post("/prescription/lab/add", uploadLabPrescription);

export default router;
