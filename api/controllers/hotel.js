//required operations to the endpoint-->

import Hotel from "../models/Hotel.js";
export const createHotel = async (req, res, next) => {
    {
        const newHotel = new Hotel(req.body);
        console.log("1  created")
        try {
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);

        } catch (err) {
            next(err);
        }
    }
}


export const updateHotel = async (req, res, next) => {
    {
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            console.log("2  created")
            res.status(200).json(updatedHotel);

        } catch (err) {
            next(err);
        }
    }
}


export const deleteHotel = async (req, res, next) => {
    {
        try {
            await Hotel.findByIdAndDelete(req.params.id);

            res.status(200).json("Hotel Deleted");

        } catch (err) {
            next(err);
        }
    }
}


export const getHotel = async (req, res, next) => {
    {
        try {
            console.log("3  created")
            const hotel = await Hotel.findById(
                req.params.id
            );
            res.status(200).json(hotel);
        } catch (err) {
            next(err);
        }
    }
}

//get Hotels using API queries-> (using minimum and maximum price)
export const getHotels = async (req, res, next) => {
    const { min, max,city, ...others } = req.query;
    const cities = req.query.city.split(",");
    try {
        // console.log("4  created")
      const hotels = await Hotel.find({
        ...others,
        // cities,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

//get Hotels using API queries-> (using city)
export const countByCity = async (req, res, next) => {
    {
        const cities = req.query.city.split(",");
        console.log(cities);
        try {
            console.log("5  created")
            const list = await Promise.all(cities.map(city => {
                return Hotel.countDocuments({ city: city })
            }))
            const hotels = await Hotel.find();

            res.status(200).json(list);

        } catch (err) {
            next(err);
        }
    }
}

export const countByType = async (req, res, next) => {


    {

        try {
            console.log("6  created")
            const hotelCount = await Hotel.countDocuments({ type: "hotel" });
            const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
            const resortCount = await Hotel.countDocuments({ type: "resort" });
            const villaCount = await Hotel.countDocuments({ type: "villa" });
            const cabinCount = await Hotel.countDocuments({ type: "cabin" });


            res.status(200).json([
                { type: "hotel", count: hotelCount },
                { type: "apartment", count: apartmentCount },
                { type: "resort", count: resortCount },
                { type: "villa", count: villaCount },
                { type: "cabin", count: cabinCount },
            ]);

        } catch (err) {
            next(err);
        }
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };