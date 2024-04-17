import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app=express();
app.use(express.json());

//db ->db connection
mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to db successfully");
    }).catch((err)=>{
        console.log(err);
});

//listener ->port
const listener=app.listen(8000, (req,  res)=>{
    console.log("Server is running at port " + listener.address().port);
});

//server ->express routes
app.get("/",(req,res)=>{res.send("Backend Home Route Working 💥💥💥")});

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error 💥";
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})


