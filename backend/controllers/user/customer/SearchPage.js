import express from "express";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";

export const getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find({
      quantity: { $gt: 2 },
    })
      .limit(10)
      .select("name options images category");

    res.status(200).json(accessories);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
