import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.config.js"
dotenv.config()
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookiePrser from "cookie-parser"

const app=express();
const PORT=process.env.PORT | 3000

app.use(express.json())
app.use(cookiePrser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:true,
    credentials:true
}))


app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

const start=()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    });
    connectDB();
}

start();
