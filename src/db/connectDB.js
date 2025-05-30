import mongoose from "mongoose";
import { DBname } from "../constants.js";


const connectDB = async () => {
  try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBname}`);
    console.log("Mongo DB connected successfully : ", connectionInstance.connection.host);
    return connectionInstance;
  }catch(error){
    console.log("ERROR: unable to connect Mongo DB", error?.message);
    process.exit(1);

  }
}

export default connectDB;