import express from "express"
import dotenv from"dotenv"
import connectDB from "./utils/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config()    // dotenv ki chiz yha pr use kr paoge
import userRoute from "./routes/user.route.js"
const app = express()  // Ye Express app bana raha hai – basically tera server yahi hai.

const PORT = process.env.PORT || 3000;
connectDB();

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:["http://localhost:5173",'https://lms-nswg.onrender.com'],
    credentials: true
}))



//apis
app.use("/api/v1/user", userRoute)

http://localhost:8000/api/v1/user/register
app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`);
})