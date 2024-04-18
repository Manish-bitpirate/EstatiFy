import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";

//handles routing for signUp
export const signup=async(req, res, next)=>{
    //destructure the required objects
    const {username, email, password}=req.body;
    //to hash the user password
    const hashedPass=bcryptjs.hashSync(password, 10);
    //save to mongodb 
    const newUser = new User({username, email, password:hashedPass});
    
    try {
        await newUser.save();
        res.status(201).json("User Created Successfully! 🎯");
    }
    catch(error) {
        next(error);
    }
}

//handles routing for signIn
export const signin=async(req, res, next)=>{
    const {email, password}=req.body;
    try {

        //check for if user email exist and valid too
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "User with this email not Found! 😞"));
        
        //check for if user password exist and valid too
        const validPass = bcryptjs.compareSync(password, validUser.password);
        if(!validPass) return next(errorHandler(401, "Wrong Password! 😬"));
        
        //if both email and password authenticated create authorization token and send cookie back to client
        const token=jwt.sign({id: validUser._id }, process.env.JWT_SECRET);
        const {password: pass, ...rest}=validUser._doc;
            res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest);
    }
    catch(error) {
        next(error);
    }
}