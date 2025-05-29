import Lab from "../../../../models/user/seller/lab/LabAuthentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginLab = async (req, res) => {
  const { email, password } = req.body;

  try {
    const lab = await Lab.findOne({ email });
    if (!lab) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, lab.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        labId: lab._id,
        account_status: lab.account_status,
        lab_name: lab.lab_name,
        profile_picture: lab.profile_picture,
        email: lab.email,
        phone_number: lab.phone_number,
        postal_code: lab.postal_code,
        address: lab.address,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        labId: lab._id,
        account_status: lab.account_status,
        lab_name: lab.lab_name,
        profile_picture: lab.profile_picture,
        email: lab.email,
        phone_number: lab.phone_number,
        postal_code: lab.postal_code,
        address: lab.address,
      },
    });
  } catch (err) {
    console.error("Lab login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};
