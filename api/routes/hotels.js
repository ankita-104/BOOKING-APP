import express from "express";

import{createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js";


const router =express.Router();
//endpoints-->
//CREATE 
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin,  updateHotel);

//DELETE

router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id",getHotel);

//GETALL
router.get("/", getHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/:id", getHotelRooms);

export default router;