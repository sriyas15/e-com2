import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/dbConnect.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import qs from "qs";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true,                // allow cookies
}));
app.use(express.json());
app.set("query parser", str => qs.parse(str));

connectDB();

dotenv.config({path: "backend/config/config.env"});

app.get("/",(req,res)=>{
    res.send("Backend Server");
    console.log("Run")
});

app.use("/api/v1",productRoutes);
app.use("/api/v1/users",userRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})