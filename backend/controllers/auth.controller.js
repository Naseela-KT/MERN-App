import bcrypt from "bcrypt"
import Admin from "../models/admin.model.js"
import handleError from "../error/error.handler.js";
import { CustomError } from "../error/custom.error.js";
import jwt from "jsonwebtoken"

export const createAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingEmail=await Admin.findOne({email:email});
        if(existingEmail){
            throw new CustomError("Email already exists!",400)
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const createAdmin=new Admin({
            email,
            password:hashedPassword
        })
        const newAdmin=await createAdmin.save();
        res.status(201).json({message:"Admin Created",adminData:newAdmin})

    } catch (error) {
        handleError(res,error,createAdmin)
    }
}

export const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingEmail=await Admin.findOne({email:email});
        if(!existingEmail){
            throw new CustomError("Email does not found!",404);
        }
        const passwordMatch=await bcrypt.compare(password,existingEmail.password);
        if(!passwordMatch){
            throw new CustomError("Invalid Password!",400)
        }
        const token=jwt.sign({_id:existingEmail._id},process.env.JWT_SECRET);
        res.cookie("token",token,{httpOnly:true});
        res.send({message:"Successfully logged In!",adminData:existingEmail,token:token})

    } catch (error) {
        handleError(res,error,adminLogin)
    }
}

export const adminLogout=async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Successfully logged out!"})
    } catch (error) {
        handleError(res,error,adminLogout)
    }
}
