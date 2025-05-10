import Customer from "../../../models/user/customer/CustomerAuthentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate token
    const token = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      token,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};
