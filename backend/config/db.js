import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://rusirujayanga:VyREmbcSeP3iovQg@cluster0.qapfzhc.mongodb.net/E-pharmacy-platform`
    )
    .then(() => console.log("DB Connected"));
};
