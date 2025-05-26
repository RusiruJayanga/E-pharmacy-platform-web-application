import Request from "../../../models/user/common/Request.js";
import jwt from "jsonwebtoken";

export const getRequestsByCustomer = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;
    const requests = await Request.find({ customer_id: customer_id })
      .populate("seller_id")
      .lean();

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
