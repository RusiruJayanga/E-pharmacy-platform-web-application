import express from "express";
import { addToWishlist } from "../../../controllers/user/customer/Save.js";

const router = express.Router();

router.post("/add-to-save", addToWishlist);

export default router;
