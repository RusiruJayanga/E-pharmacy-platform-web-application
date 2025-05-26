import express from "express";
import {
  getAllCustomers,
  deleteCustomer,
} from "../../controllers/admin/CustomerPage.js";

const router = express.Router();

router.get("/customer/", getAllCustomers);
router.delete("/customer/:id", deleteCustomer);

export default router;
