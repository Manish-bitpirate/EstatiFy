import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app=express();

//db ->db connection
mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to db successfully");
    }).catch((err)=>{
        console.log(err);
});


//server ->express routes
app.use("/", userRouter);


//listener ->port
const listener=app.listen(8000, (req,  res)=>{
    console.log("Server is running at port " + listener.address().port);
});

