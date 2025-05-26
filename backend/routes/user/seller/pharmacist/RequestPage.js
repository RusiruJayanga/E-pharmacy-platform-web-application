import express from "express";
import { getSellerRequests } from "../../../../controllers/user/seller/pharmacist/RequestPage.js";
import {
  getRequestById,
  approveRequest,
  rejectRequest,
} from "../../../../controllers/user/seller/pharmacist/RequestDetails.js";

const router = express.Router();

router.get("/seller/requests", getSellerRequests);
router.get("/:id", getRequestById);
router.put("/approve/:id", approveRequest);
router.put("/reject/:id", rejectRequest);

export default router;
