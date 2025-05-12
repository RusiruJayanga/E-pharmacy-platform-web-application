import express from "express";
import { getMedicines } from "../../../controllers/user/customer/MedicinePage.js";

const router = express.Router();

router.get("/", getMedicines);

export default router;
