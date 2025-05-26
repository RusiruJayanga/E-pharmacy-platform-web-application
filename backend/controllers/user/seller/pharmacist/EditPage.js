import Accessory from "../../../../models/user/common/ProductAccessory.js";
import Medicine from "../../../../models/user/common/ProductMedicine.js";

export const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: "Not found" });
    res.json(accessory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAccessory = async (req, res) => {
  try {
    const updated = await Accessory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ message: "Not found" });
    res.json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
