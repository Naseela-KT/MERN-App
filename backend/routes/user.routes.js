import {Router} from "express";
import { addUser, allUsers, deleteUser, findOneUser, getUsers, updateUser } from "../controllers/user.controller.js";
const router=Router();

// router.post("/add",createAdmin);
// router.post("/edit",adminLogin);
router.get("/getusers",getUsers)
router.get("/",allUsers);
router.post("/add",addUser);
router.get("/getUser",findOneUser)
router.put("/edit",updateUser)
router.delete("/:id",deleteUser)


export default router;