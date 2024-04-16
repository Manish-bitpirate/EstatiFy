import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//db
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to db successfully");
    }).catch((err)=>{
        console.log(err);
    });

//server
const app=express();
app.get('/', (req, res)=> {
    res.send("Backend Response")
});
const listener=app.listen(8000, (req, res)=>{
    console.log("Server is running at port " + listener.address().port);
});
