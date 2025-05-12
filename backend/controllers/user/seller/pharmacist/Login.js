import Pharmacist from "../../../../models/user/seller/pharmacist/PharmacistAuthentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginPharmacist = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pharmacist = await Pharmacist.findOne({ email });
    if (!pharmacist) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, pharmacist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate token
    const token = jwt.sign(
      {
        pharmacistId: pharmacist._id,
        account_status: pharmacist.account_status,
        pharmacy_name: pharmacist.pharmacy_name,
        email: pharmacist.email,
        phone_number: pharmacist.phone_number,
        postal_code: pharmacist.postal_code,
        address: pharmacist.address,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: pharmacist._id,
        pharmacy_name: pharmacist.pharmacy_name,
        email: pharmacist.email,
        phone_number: pharmacist.phone_number,
        account_status: pharmacist.account_status,
        postal_code: pharmacist.postal_code,
        address: pharmacist.address,
      },
    });
  } catch (err) {
    console.error("Pharmacist login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};
