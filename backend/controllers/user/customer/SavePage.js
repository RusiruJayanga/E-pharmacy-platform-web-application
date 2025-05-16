import Save from "../../../models/user/customer/Save.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";
import Lab from "../../../models/user/seller/lab/LabAuthentication.js";
import Doctor from "../../../models/user/seller/doctor/DoctorAuthentication.js";
import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";

const modelMap = {
  Medicine,
  Accessory,
  Lab,
  Doctor,
  Pharmacy: Pharmacist,
};

//get all saved items by customer
export const getSavedItems = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const savedItems = await Save.find({ customer_id });

    const detailedItems = await Promise.all(
      savedItems.map(async (item) => {
        const Model = modelMap[item.productType];
        const product = await Model.findById(item.product_id);
        if (!product) return null;

        return {
          _id: item._id,
          productType: item.productType,
          product,
        };
      })
    );

    res.status(200).json(detailedItems.filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: "Failed to get saved items", error });
  }
};

//delete a saved item
export const deleteSavedItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Save.findByIdAndDelete(id);
    res.status(200).json({ message: "Saved item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
};
