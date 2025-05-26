import Appointment from "../../../models/user/common/Appointment.js";
import Doctor from "../../../models/user/seller/doctor/DoctorAuthentication.js";
import Lab from "../../../models/user/seller/lab/LabAuthentication.js";
import OrderItem from "../../../models/user/common/OrderItem.js";
import Order from "../../../models/user/common/OrderPlatform.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";
import Pharmacist from "../../../models/user/seller/pharmacist/PharmacistAuthentication.js";
import Request from "../../../models/user/common/Request.js";

export const getAppointmentById = async (req, res) => {
  try {
    const { appointmentid } = req.params;

    const appointment = await Appointment.findById(appointmentid);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    let sellerDetails;
    if (appointment.sellerType === "Doctor") {
      sellerDetails = await Doctor.findById(appointment.seller_id).select(
        "-password"
      );
    } else if (appointment.sellerType === "Lab") {
      sellerDetails = await Lab.findById(appointment.seller_id).select(
        "-password"
      );
    }

    if (!sellerDetails) {
      return res
        .status(404)
        .json({ message: `${appointment.sellerType} not found` });
    }

    res.status(200).json({ ...appointment.toObject(), sellerDetails });
  } catch (err) {
    console.error("Error fetching appointment:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getOrderDetailsById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    const orderItems = await OrderItem.find({ order_id: orderId }).populate(
      "seller_id"
    );

    if (!order || !orderItems || orderItems.length === 0) {
      return res
        .status(404)
        .json({ message: "Order or order items not found" });
    }

    // Populate product manually based on type
    const populatedItems = await Promise.all(
      orderItems.map(async (item) => {
        let product;
        if (item.productType === "Medicine") {
          product = await Medicine.findById(item.product_id).select(
            "name images"
          );
        } else if (item.productType === "Accessory") {
          product = await Accessory.findById(item.product_id).select(
            "name images"
          );
        }

        return {
          _id: item._id,
          product: {
            _id: product?._id || null,
            name: product?.name || "Deleted Product",
            image: product?.images?.[0] || null,
            type: item.productType,
          },
          seller: {
            _id: item.seller_id._id,
            name: item.seller_id.owner_name,
            pharmacy: item.seller_id.pharmacy_name,
            email: item.seller_id.email,
            phone: item.seller_id.phone_number,
          },
          quantity: item.quantity,
          option: item.option,
          price: item.price,
          status: item.status,
          order_date: item.order_date,
          delivery_date: item.delivery_date,
        };
      })
    );

    const response = {
      order: {
        _id: order._id,
        customer_id: order.customer_id,
        total_amount: order.total_amount,
        payment_status: order.payment_status,
        order_date: order.order_date,
        delivery_method: order.delevery_method,
      },
      items: populatedItems,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRequestDetails = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId).populate("seller_id");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const pharmacy = request.seller_id;

    res.status(200).json({
      requestId: request._id,
      customerId: request.customer_id,
      status: request.status,
      request_date: request.request_date,
      description: request.description,
      seller_description: request.seller_description,
      image: request.image,
      pharmacy: {
        pharmacy_id: pharmacy._id,
        pharmacy_name: pharmacy.pharmacy_name,
        phone_number: pharmacy.phone_number,
        email: pharmacy.email,
        profile_picture: pharmacy.profile_picture,
      },
    });
  } catch (error) {
    console.error("Error fetching request details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
