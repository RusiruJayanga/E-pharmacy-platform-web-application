import OrderItem from "../../models/user/common/OrderItem.js";
import Medicine from "../../models/user/common/ProductMedicine.js";
import Accessory from "../../models/user/common/ProductAccessory.js";
import Customer from "../../models/user/customer/CustomerAuthentication.js";

export const getAdminStats = async (req, res) => {
  try {
    const deliveredOrdersCount = await OrderItem.countDocuments({
      status: "delivered",
    });

    const medicineCount = await Medicine.countDocuments();
    const accessoryCount = await Accessory.countDocuments();
    const totalProductsCount = medicineCount + accessoryCount;
    const customersCount = await Customer.countDocuments();

    const currentYear = new Date().getFullYear();
    const monthlySales = await OrderItem.aggregate([
      {
        $match: {
          order_date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: { $month: "$order_date" },
          totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      {
        $project: {
          month: "$_id",
          totalSales: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const monthNames = [
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
    const formattedMonthlySales = monthNames.map((name, index) => {
      const monthData = monthlySales.find((item) => item.month === index + 1);
      return {
        month: name,
        sales: monthData ? monthData.totalSales : 0,
      };
    });

    const medicineInventory = await Medicine.aggregate([
      { $group: { _id: "$category", totalQuantity: { $sum: "$quantity" } } },
    ]);
    const accessoryInventory = await Accessory.aggregate([
      { $group: { _id: "$category", totalQuantity: { $sum: "$quantity" } } },
    ]);

    const inventoryData = [
      ...medicineInventory.map((item) => ({
        name: item._id,
        quantity: item.totalQuantity,
      })),
      ...accessoryInventory.map((item) => ({
        name: item._id,
        quantity: item.totalQuantity,
      })),
    ];

    res.status(200).json({
      deliveredOrdersCount,
      totalProductsCount,
      customersCount,
      monthlySales: formattedMonthlySales,
      inventoryData,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Error fetching admin statistics" });
  }
};
