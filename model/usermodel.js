
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, require: true }, 
    role:{type:String,enum:["admin","buyer"],default:"buyer"},
    cartData: { type: Object, default: {} } // User's cart data (default: empty object)
}, { minimize: false }); // Ensures that empty objects are saved in the database


const userModel = mongoose.models.user || mongoose.model("user", userSchema);


export default userModel;
