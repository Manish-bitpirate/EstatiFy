import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";
import { signOut } from "../controllers/auth.controller.js";
import { googleSignIn } from "../controllers/auth.controller.js";

//signup route
const router = express.Router();

//route for signUp
router.post("/signup", signUp);
//route for signIn
router.post("/signin", signIn);
//route for googleSignIn
router.post("/google", googleSignIn);
//route for signOut
router.get("/signout", signOut);

export default router;
