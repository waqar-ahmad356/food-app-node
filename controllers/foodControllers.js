
import foodModel from "../model/foodModel.js";
import fs from 'fs';

// Function to add a food item
const addFood = async (req, res) => {
    if(req.user.role !=="admin")
        {
            console.log("role:",req.user.role)
            return res.status(403).send("Access Denied");
        }
    // Extracting the filename of the uploaded image
    let image_filename = `${req.file.filename}`;
    // Creating a new food item using the foodModel
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        // Saving the new food item to the database
        await food.save();
        // Sending a JSON response indicating success
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Function to retrieve all food items
const listfood = async (req, res) => {
   
    try {
        // Fetching all food items from the database
        const foods = await foodModel.find({});
        // Sending a JSON response containing the list of food items
        res.json({ success: true, data: foods });
    } catch (error) {
       
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Function to remove a food item
const removefood = async (req, res) => {
    if(req.user.role !=="admin")
        {
            console.log("role:",req.user.role)
            return res.status(403).send("Access Denied");
        }
    try {
        // Finding the food item by its ID
        const food = await foodModel.findById(req.body.id);
        // Deleting the corresponding image file from the upload directory
        await fs.unlink(`upload/${food.image}`, () => {})
        
        await foodModel.findByIdAndDelete(req.body.id);
       
        res.json({ success: true, message: 'Product Removed' });
    } catch (error) {
      
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// Function to retrieve all food items
const listfoods = async (req, res) => {
   
    try {
        // Fetching all food items from the database
        const foods = await foodModel.find({});
        // Sending a JSON response containing the list of food items
        res.json({ success: true, data: foods });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
// Exporting the addFood, listfood, and removefood functions for use in other files
export { addFood, listfood, removefood,listfoods };
