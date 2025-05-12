import Customer from "../../../models/user/customer/CustomerAuthentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCustomer = async (req, res) => {
  const { name, address, postal_code, phone_number, email, password } =
    req.body;

  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment variables.");
      return res.status(500).json({ message: "Server configuration error" });
    }
    //check for existing customer by email or phone
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { phone_number }],
    });

    if (existingCustomer) {
      return res.status(400).json({
        message:
          existingCustomer.email === email
            ? "Email already in use"
            : "Phone number already in use",
      });
    }
    const customer = new Customer({
      name,
      address,
      postal_code,
      phone_number,
      email,
      password,
    });

    await customer.save();

    //generate token
    const token = jwt.sign(
      {
        customerId: customer._id,
        account_status: customer.account_status,
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
        postal_code: customer.postal_code,
        address: customer.address,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      token,
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone_number: customer.phone_number,
        account_status: customer.account_status,
        postal_code: customer.postal_code,
        address: customer.address,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};
