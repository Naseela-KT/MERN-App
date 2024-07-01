import {Router} from "express";
import {adminLogin, adminLogout, createAdmin} from "../controllers/admin.controller.js"
const router=Router();


router.post("/add",createAdmin);
router.post("/login",adminLogin);
router.get("/logout",adminLogout)


export default router;