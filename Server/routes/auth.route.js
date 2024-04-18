import express from "express";
import {signup} from "../controllers/auth.controller.js";

//signup route
const router=express.Router();

router.post("/signup", signup);

export default router;