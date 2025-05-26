import Doctor from "../../../../models/user/seller/doctor/DoctorAuthentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate token
    const token = jwt.sign(
      {
        doctorId: doctor._id,
        account_status: doctor.account_status,
        profile_picture: doctor.profile_picture,
        name: doctor.name,
        email: doctor.email,
        phone_number: doctor.phone_number,
        address: doctor.address,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        doctorId: doctor._id,
        account_status: doctor.account_status,
        profile_picture: doctor.profile_picture,
        name: doctor.name,
        email: doctor.email,
        phone_number: doctor.phone_number,
        address: doctor.address,
      },
    });
  } catch (err) {
    console.error("Doctor login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};
