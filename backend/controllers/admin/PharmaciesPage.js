import Pharmacist from "../../models/user/seller/pharmacist/PharmacistAuthentication.js";
import Customer from "../../models/user/customer/CustomerAuthentication.js";
import mongoose from "mongoose";

// Get doctors by status
export const getPharmacistsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ["Pending", "Approved", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const pharmacists = await Pharmacist.find({
      account_status: status,
    }).select("-password -__v");

    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update doctor status
export const updatePharmacistStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["Pending", "Approved", "Rejected"];

    if (!validStatuses.includes(status)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
      id,
      { account_status: status },
      { new: true, session }
    ).select("-password -__v");

    if (!updatedPharmacist) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Pharmacist not found" });
    }

    if (updatedPharmacist.user_id) {
      if (status === "Approved") {
        const customer = await Customer.findByIdAndUpdate(
          updatedPharmacist.user_id,
          { account_status: "Pharmacist" },
          { new: true, session }
        );

        if (!customer) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({
            message: "Associated customer not found",
            pharmacist: updatedPharmacist,
          });
        }
      }

      if (status === "Rejected") {
        await Customer.findByIdAndUpdate(
          updatedPharmacist.user_id,
          { account_status: "Rejected" },
          { new: true, session }
        );
      }
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json(updatedPharmacist);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error during update" });
  }
};

// Get doctor details
export const getPharmacistDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacist = await Pharmacist.findById(id).select("-password -__v");

    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }

    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
