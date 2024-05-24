import express from "express";
import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
//route to create new listing
router.post("/create", verifyToken, createListing);
//route to delete a listing
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
