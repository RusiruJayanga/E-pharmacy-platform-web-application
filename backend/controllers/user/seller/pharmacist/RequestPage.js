import Request from "../../../../models/user/common/Request.js";
import Pharmacist from "../../../../models/user/seller/pharmacist/PharmacistAuthentication.js";
import Customer from "../../../../models/user/customer/CustomerAuthentication.js";
import jwt from "jsonwebtoken";

export const getSellerRequests = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const pharmacistId = decoded.pharmacistId;

    if (!pharmacistId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const requests = await Request.find({ seller_id: pharmacistId })
      .populate("customer_id", "name")
      .sort({ request_date: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error });
  }
};
