import Request from "../../../../models/user/common/Request.js";
import Customer from "../../../../models/user/customer/CustomerAuthentication.js";

// Get request with populated customer details
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "customer_id"
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Approve request
export const approveRequest = async (req, res) => {
  try {
    const { seller_description } = req.body;
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.seller_description = seller_description;
    request.status = "Accepted";
    await request.save();

    res.json({ message: "Request approved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "Rejected";
    await request.save();

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
