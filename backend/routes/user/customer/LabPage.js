import express from "express";
import { getLabs } from "../../../controllers/user/customer/LabPage.js";

const router = express.Router();

router.get("/", getLabs);

export default router;
