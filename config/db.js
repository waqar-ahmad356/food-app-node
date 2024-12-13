// Import mongoose package
import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
    // Connect to the MongoDB Atlas cluster
    await mongoose.connect('mongodb+srv://waqar:waqar392936@cluster0.xx0mn.mongodb.net/food-delivery-app-zapta')
        .then(() => {
            // If connection is successful, log a success message
            console.log("DB Connected");
        })
}
