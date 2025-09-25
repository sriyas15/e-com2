import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/dbConnect.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import qs from "qs";

const app = express();

app.use(express.json());
app.set("query parser", str => qs.parse(str));

connectDB();

dotenv.config({path: "backend/config/config.env"});

app.get("/",(req,res)=>{
    res.send("Backend Server");
    console.log("Run")
});

app.use("/api/v1",productRoutes);
app.use("/api/v1",userRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})