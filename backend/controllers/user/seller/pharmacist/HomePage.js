import Accessory from "../../../../models/user/common/ProductAccessory.js";
import Medicine from "../../../../models/user/common/ProductMedicine.js";
import OrderItem from "../../../../models/user/common/OrderItem.js";
import Review from "../../../../models/user/common/Review.js";
import mongoose from "mongoose";

export const getSellerDashboard = async (req, res) => {
  try {
    const { seller_Id } = req.params;
    const sellerId = new mongoose.Types.ObjectId(seller_Id);
    const [productCount] = await Accessory.aggregate([
      { $match: { seller_id: sellerId } },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);
    const [medicineCount] = await Medicine.aggregate([
      { $match: { seller_id: sellerId } },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);
    const totalProducts =
      (productCount?.total || 0) + (medicineCount?.total || 0);

    const deliveredOrders = await OrderItem.countDocuments({
      seller_id: sellerId,
      status: "delivered",
    });

    const inventoryAgg = await Promise.all([
      Accessory.aggregate([
        { $match: { seller_id: sellerId } },
        {
          $group: {
            _id: "$category",
            quantity: { $sum: "$quantity" },
          },
        },
      ]),
      Medicine.aggregate([
        { $match: { seller_id: sellerId } },
        {
          $group: {
            _id: "$category",
            quantity: { $sum: "$quantity" },
          },
        },
      ]),
    ]);
    const inventory = [...inventoryAgg[0], ...inventoryAgg[1]].map((i) => ({
      name: i._id,
      quantity: i.quantity,
    }));

    const startYear = new Date(new Date().getFullYear(), 0, 1);
    const monthlySalesRaw = await OrderItem.aggregate([
      {
        $match: {
          seller_id: sellerId,
          status: "delivered",
          order_date: { $gte: startYear },
        },
      },
      {
        $group: {
          _id: { $month: "$order_date" },
          sales: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlySales = months.map((m, idx) => {
      const record = monthlySalesRaw.find((r) => r._id === idx + 1);
      return { month: m, sales: record ? record.sales : 0 };
    });

    const ratingAgg = await Review.aggregate([
      { $match: { target: sellerId, targetModel: "Pharmacist" } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
    const rating = Number((ratingAgg[0]?.avgRating || 0).toFixed(1));

    res.json({
      deliveredOrders,
      totalProducts,
      rating,
      inventory,
      monthlySales,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
