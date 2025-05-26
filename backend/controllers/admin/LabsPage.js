import Lab from "../../models/user/seller/lab/LabAuthentication.js";
import Customer from "../../models/user/customer/CustomerAuthentication.js";
import mongoose from "mongoose";

// Get doctors by status
export const getLabsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ["Pending", "Approved", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const labs = await Lab.find({ account_status: status }).select(
      "-password -__v"
    );

    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update doctor status
export const updateLabStatus = async (req, res) => {
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

    const updatedLab = await Lab.findByIdAndUpdate(
      id,
      { account_status: status },
      { new: true, session }
    ).select("-password -__v");

    if (!updatedLab) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Lab not found" });
    }

    if (updatedLab.user_id) {
      if (status === "Approved") {
        const customer = await Customer.findByIdAndUpdate(
          updatedLab.user_id,
          { account_status: "Lab" },
          { new: true, session }
        );

        if (!customer) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({
            message: "Associated customer not found",
            lab: updatedLab,
          });
        }
      }

      if (status === "Rejected") {
        await Customer.findByIdAndUpdate(
          updatedLab.user_id,
          { account_status: "Rejected" },
          { new: true, session }
        );
      }
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json(updatedLab);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error during update" });
  }
};

// Get doctor details
export const getLabDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const lab = await Lab.findById(id).select("-password -__v");

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
