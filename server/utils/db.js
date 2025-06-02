import mongoose from "mongoose"; // connect krega server ko db se

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected successfully");
    }
    catch(error){
        console.log("error occured",error);
    }

}
export default connectDB;