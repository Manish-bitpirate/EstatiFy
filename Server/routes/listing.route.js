import express from "express";
import { createListing, deleteListing, updateListing, getListing, getListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
//route to create new listing
router.post("/create", verifyToken, createListing);
//route to delete a listing
router.delete("/delete/:id", verifyToken, deleteListing);
//route to update a listing
router.put("/update/:id", verifyToken, updateListing);
//route to get a listing
router.get("/get/:id", getListing);
//route to get all searched listing
router.get("/get", getListings);

export default router;
