import handleError from "../error/error.handler.js";
import { CustomError } from "../error/custom.error.js";
import User from "../models/user.model.js"

export const allUsers=async(req,res)=>{
    try {
        const users = await User.find().populate('friends', 'name email');
        res.send({users:users})
    } catch (error) {
        handleError(res,error,allUsers)
    }
}

export const findOneUser=async(req,res)=>{
    try {
        
        const id=req.query.id
        const user = await User.findOne({_id:id});
        res.send({user:user})
    } catch (error) {
        handleError(res,error,allUsers)
    }
}

export const addUser=async(req,res)=>{
    try {
       
        const {name,email,friends}=req.body;
        console.log(name,email,friends)
        const createUser=new User({
            name,
            email,
            friends
        })
        const newUser=await createUser.save();
        res.send({user:newUser})
    } catch (error) {
        handleError(res,error,addUser)
    }
}

export const updateUser=async(req,res)=>{
    try {
        const id=req.query.id
        const {name,email,friends}=req.body;
        const createUser=await User.findOneAndUpdate({_id:id},{$set:{name,email,friends}})
        res.send({user:createUser})
    } catch (error) {
        handleError(res,error,addUser)
    }
}