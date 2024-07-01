import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})

export default mongoose.model("User",userSchema)