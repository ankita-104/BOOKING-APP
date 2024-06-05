import express from "express";
import{createRoom, deleteRoom , getRoom, getRooms, updateRoom, updateRoomAvailability} from "../controllers/room.js";
import{verifyAdmin} from "../utils/verifyToken.js"
const router =express.Router();

//endpoints-->
//CREATE 
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE

router.put("/:id",  updateRoom);
router.put("availability/:id", verifyAdmin,  updateRoomAvailability);

//DELETE

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id",getRoom);
//GETALL
router.get("/", getRooms);



export default router;