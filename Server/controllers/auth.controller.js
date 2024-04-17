import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
// import {errorHandler} from "../utils/error.js";

export const signup=async(req, res, next)=>{
    const {username, email, password}=req.body;
    const hashedPass=bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password:hashedPass});
    
    try {
        await newUser.save();
        res.status(201).send("User Created Successfully! 🎯");
    }
    catch(error) {
        next(error);
    }
}
