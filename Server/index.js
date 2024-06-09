import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

//deployment setup
import path from 'path';
const __dirname = path.resolve();

//for using env variables
dotenv.config();
//to use express and json 
const app=express();
app.use(express.json());
app.use(cookieParser());

//db ->db connection
mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to db successfully");
    }).catch((err)=>{
        console.error(err);
});

//listener ->port
const listener=app.listen(8000, (req,  res)=>{
    console.log("Server is running at port " + listener.address().port);
});

//server ->express routes
app.get("/",(req,res)=>{res.send("Backend Home Route Working 💥💥💥")});

//route for user data- get/update/delete/all user listings operations
app.use("/api/user", userRouter);

//route for user sign- in/up/out user operations
app.use("/api/auth", authRouter);

//route for listing - create/delete/update/get/search listings operations
app.use("/api/listing", listingRouter);


//deployment setup
app.use(express.static(path.join(__dirname, '/Client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
// })


//error handler
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error 💥';
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})


