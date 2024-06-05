// main file to run this program 
import express from "express"
// const express = require("express")
import dotenv from "dotenv"
import mongoose from "mongoose"

import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js" 
import hotelsRoute from "./routes/hotels.js" 
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
dotenv.config()

//Initial mongoDb connection -->
const connect = async()=>{
   try{
      await mongoose.connect(process.env.MONGO);
      console.log("Mongodb initial connection successful!")
   }
   catch(error){
      // handleError(error);
      throw error;
   }
}

//other MongoDb connection --->

mongoose.connection.on("disconnected", ()=>{
   console.log("mongoDB Disconnected");
})
mongoose.connection.on("connected", ()=>{
   console.log("mongoDB Connected");
})

//main route-->
app.get('/',  (req, res)=>{
   res.send("hello this is auth endpoint!")
})

//middlewares creation-->
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// app.use("/auth", authRoute);
// or 
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
//Error handler middleware-->

app.use((err, req, res, next)=>{
   // return res.status(500).json("Error from Handler!")

   const errorStatus = err.status||500;
   const errorMessage = err.message||"Something went wrong";
   return res.status(errorStatus).json({
      sauccess: false,
      status: errorStatus,
      message: errorMessage,
     stack: err.stack,
   });
});


app.listen(8800, ()=>{
   connect()
   console.log("connected to backend! yay") 
})