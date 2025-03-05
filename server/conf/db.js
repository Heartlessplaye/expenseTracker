import mongoose from "mongoose";
import { conf } from "./conf.js";
export const connectDB =  async() => {
  try {
    await mongoose.connect(conf.mongo_uri);
    console.log('mongodb connection successful');
  }catch(error){
    console.log('mongoDB connection failed', error.message);
  }

}