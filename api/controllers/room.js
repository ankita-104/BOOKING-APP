import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import {createError } from "../utils/error.js"

export const createRoom = async (req, res, next) => {

const hotelId = req.params.hotelid;
const newRoom =  new Room(req.body);
try{
    const savedRoom = await newRoom.save();
    try{
        await Hotel.findByIdAndUpdate(hotelId, {
            $push:{rooms:savedRoom._id},
        })
    }catch(err){
        next(err);
    }

    res.status(200).json(savedRoom);

}catch(err){
    next(err);
}
}


export const updateRoom = async (req, res, next) => {
    {
        try {
            const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(200).json(updatedRoom);

        } catch (err) {
            next(err);
        }
    }
}

//this function is used To Reserve rooms and update the status of unAvailability

export const updateRoomAvailability = async (req, res, next) => {
    {
        try {
          await Room.updateOne({"roomNumbers._id":req.params.id},
          {
            $push:{
                // for nested properties--> 
                "roomNumbers.$.unavailableDates":req.body.dates
            },

          }

          )
            res.status(200).json(updatedRoom);

        } catch (err) {
            next(err);
        }
    }
}



export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };


export const getRoom = async (req, res, next) => {
    {
        try {
            const room = await Room.findById(
                req.params.id
            );
            res.status(200).json(room);
        } catch (err) {
            next(err);
        }
    }
}


export const getRooms = async (req, res, next) => {
    {
        // const failed= true;
        // if(failed) return next(createError(401, "You are not authenticated"))

        try {
            const rooms = await Room.find();

            res.status(200).json(rooms);

        } catch (err) {
            next(err);
        }
    }
}