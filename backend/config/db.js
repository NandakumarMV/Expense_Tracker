import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
