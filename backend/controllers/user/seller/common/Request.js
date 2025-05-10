import Doctor from "../../../../models/user/seller/doctor/DoctorAuthentication.js";
import Pharmacist from "../../../../models/user/seller/pharmacist/PharmacistAuthentication.js";
import Lab from "../../../../models/user/seller/lab/LabAuthentication.js";
import Customer from "../../../../models/user/customer/CustomerAuthentication.js";

export const requestSellerRole = async (req, res) => {
  try {
    const role = req.body.role;

    if (!["Doctor", "Pharmacist", "Lab Owner"].includes(role)) {
      return res.status(400).json({ message: "Invalid seller role." });
    }

    const { email } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    let createdSeller = null;

    switch (role) {
      case "Doctor":
        createdSeller = new Doctor({ ...req.body, account_status: "Pending" });
        await createdSeller.save();
        existingCustomer.account_status = "Doctor";
        break;

      case "Pharmacist":
        createdSeller = new Pharmacist({
          ...req.body,
          account_status: "Pending",
        });
        await createdSeller.save();
        existingCustomer.account_status = "Pharmacist";
        break;

      case "Lab Owner":
        createdSeller = new Lab({ ...req.body, account_status: "Pending" });
        await createdSeller.save();
        existingCustomer.account_status = "Lab Owner";
        break;
    }

    await existingCustomer.save();

    res.status(201).json({ message: "Seller request submitted successfully." });
  } catch (err) {
    console.error("Request error:", err.message);
    res.status(500).json({ message: "Server error while processing request." });
  }
};
