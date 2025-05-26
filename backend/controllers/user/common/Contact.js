import Contact from "../../../models/user/common/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Message received!", id: contact._id });
  } catch (err) {
    res.status(400).json({ message: "Validation failed", error: err.message });
  }
};
