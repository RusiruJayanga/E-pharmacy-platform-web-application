import express from "express";
import { getAccessoryById } from "../../../controllers/user/customer/AccessoryDetails.js";

const router = express.Router();

router.get("/:id", getAccessoryById);

export default router;
