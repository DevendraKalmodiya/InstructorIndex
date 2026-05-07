import dotenv from "dotenv"
import express from "express"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url'
import "./utils/cloudinary.js";

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.join(__dirname, ".env")
});

const app = express()

const PORT = process.env.PORT || 3000

// default middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:["https://instructorindex.vercel.app", "http://localhost:5173", "http://localhost:3000"],
    credentials:true
}))

const _dirname = path.resolve()



// apis
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)

// app.use(express.static(path.join(_dirname, "/Client/dist")));
// app.get("*", (_, res)=>{
//     res.sendFile(path.resolve(_dirname, "Client", "dist", "index.html"))
// });


app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
    
})
