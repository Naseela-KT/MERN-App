import {Router} from "express";
import { addUser, allUsers, findOneUser, updateUser } from "../controllers/user.controller.js";
const router=Router();

// router.post("/add",createAdmin);
// router.post("/edit",adminLogin);
router.get("/",allUsers);
router.post("/add",addUser);
router.get("/getUser",findOneUser)
router.put("/edit",updateUser)


export default router;