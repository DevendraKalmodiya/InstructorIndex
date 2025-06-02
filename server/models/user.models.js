import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        required: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,  //enrolledCourses ek array hai (kyunki square brackets [ ] hain).                                        //Har item usme ek ObjectId hoga jo kisi Course document ka reference hai.          
            ref: 'Course'                         //ka matlab: ye ObjectId kis collection se linked hai — yaha Course se.
                                                 // ref: 'Course' ka matlab: ye ObjectId kis collection se linked hai — yaha Course se.
        }]        
}, { timestamps: true })    //Ye auto-create karta hai:
                            //createdAt
                            //updatedAt
export const User = mongoose.model('User', userSchema) //Yaha tu userSchema ko use karke ek model User bana raha hai.
//Ab tu is User model ko CRUD (Create, Read, Update, Delete) operations me use kar sakta hai database ke sath.

