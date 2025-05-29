import Appointment from "../../../../models/user/common/Appointment.js";

export const getAppointmentById = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId).populate(
      "customer_id"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const approveAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { due_date } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: "Accepted",
        due_date: due_date,
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment approved", appointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const rejectAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: "Rejected",
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment rejected", appointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
