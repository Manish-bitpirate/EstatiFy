import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListings
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

//default backend route
router.get("/test", test);
//route for updateUser
router.put("/update/:id", verifyToken, updateUser);
//route for deleteUser
router.delete("/delete/:id", verifyToken, deleteUser);
//route for showListings
router.get("/listings/:id", verifyToken, getUserListings);

export default router;
