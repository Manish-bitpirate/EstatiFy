import express from "express";

const app=express();

app.get('/', (req, res)=> {
    res.send("Backend Response")
});

const listener=app.listen(8000, (req, res)=>{
    console.log("Server is running at port " + listener.address().port);
});
