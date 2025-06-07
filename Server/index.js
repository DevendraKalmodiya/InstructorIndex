import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve() + '/.env' }); 
console.log("JWT_SECRET from env:", process.env.JWT_SECRET); // ⬅️ YAHAN

import express from "express"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"




const app = express()

const PORT = process.env.PORT || 5000

// default middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5174"
];

app.use(cors({
     origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials:true
}))

const _dirname = path.resolve()



// apis
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)

app.use(express.static(path.join(_dirname, "/Client/dist")));
app.get("*", (_, res)=>{
    res.sendFile(path.resolve(_dirname, "Client", "dist", "index.html"))
});


app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
    
})