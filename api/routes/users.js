import express from "express";

import{ updateUser, deleteUser, getUser, getUsers} from "../controllers/user.js"
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router =express.Router();

//endpointsUser
// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("hello users! You are logged in!");
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("hello users! You are logged in and can delete your account!");
// });


// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("hello admin! You logged in and scan delete all account!");
// });



//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE

router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);

//GETALL
router.get("/", verifyAdmin, getUsers);



export default router;