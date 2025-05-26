import express from "express";
import {
  getSellerOrders,
  updateOrderItemStatus,
} from "../../../../controllers/user/seller/pharmacist/OrderPage.js";

const router = express.Router();

router.get("/seller/:sellerId", getSellerOrders);

router.patch("/item/:itemId/status", updateOrderItemStatus);

export default router;
