import Doctor from "../../models/user/seller/doctor/DoctorAuthentication.js";
import Customer from "../../models/user/customer/CustomerAuthentication.js";
import mongoose from "mongoose";

export const getDoctorsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ["Pending", "Approved", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const doctors = await Doctor.find({ account_status: status }).select(
      "-password -__v"
    );

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoctorStatus = async (req, res) => {
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

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { account_status: status },
      { new: true, session }
    ).select("-password -__v");

    if (!updatedDoctor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (updatedDoctor.user_id) {
      if (status === "Approved") {
        const customer = await Customer.findByIdAndUpdate(
          updatedDoctor.user_id,
          { account_status: "Lab" },
          { new: true, session }
        );

        if (!customer) {
          await session.abortTransaction();
          session.endSession();
          return res.status(404).json({
            message: "Associated customer not found",
            doctor: updatedDoctor,
          });
        }
      }

      if (status === "Rejected") {
        await Customer.findByIdAndUpdate(
          updatedDoctor.user_id,
          { account_status: "Rejected" },
          { new: true, session }
        );
      }
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json(updatedDoctor);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error during update" });
  }
};

// Get doctor details
export const getDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).select("-password -__v");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
