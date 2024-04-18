import express from "express";
import {userController} from "../controllers/user.controller.js";

//user route
const router=express.Router();

router.get('/test', userController);

export default router;