import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: "backend/config/config.env"});

export const connectDB = async()=>{
    const connect = await mongoose.connect(process.env.DB_LOCAL_URL).then((con)=>{
        console.log(`MongoDB connected at ${con.connection.host}`);
    }).catch((e)=>console.log(e));

} 

