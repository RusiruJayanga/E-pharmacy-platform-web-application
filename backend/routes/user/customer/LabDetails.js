import express from "express";
import { getLabById } from "../../../controllers/user/customer/LabDetails.js";

const router = express.Router();

router.get("/:id", getLabById);

export default router;
