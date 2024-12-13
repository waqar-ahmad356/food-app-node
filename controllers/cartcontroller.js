
import userModel from "../model/usermodel.js";


const addToCart = async (req, res) => {
    if(req.user.role !=="buyer")
        {
            console.log(req.user.role)
            return res.status(403).send("Access Denied");
        }
    try {
        // Find the user data based on the userId provided in the request
        let userData = await userModel.findById(req.body.userId);
        // Retrieve the cart data from the user's data
        let cartData = await userData.cartData;
        // Check if the item exists in the cart, if not, add it with a quantity of 1
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            // If the item already exists, increment its quantity by 1
            cartData[req.body.itemId] += 1;
        }
        // Update the user's data with the modified cartData
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // Send a JSON response indicating success
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Function to remove an item from the user's cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user data based on the userId provided in the request
        let userData = await userModel.findById(req.body.userId);
        // Retrieve the cart data from the user's data
        let cartData = await userData.cartData;
        // Check if the item exists in the cart and has a quantity greater than 0
        if (cartData[req.body.itemId] > 0) {
            // If so, decrement its quantity by 1
            cartData[req.body.itemId] -= 1;
        }
        // Update the user's data with the modified cartData
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        // Send a JSON response indicating success
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Function to fetch the user's cart data
const getCart = async (req, res) => {
    try {
        // Find the user data based on the userId provided in the request
        let userData = await userModel.findById(req.body.userId);
        // Retrieve the cart data from the user's data
        let cartData = await userData.cartData;
        // Send a JSON response containing the cart data
        res.json({ success: true, cartData });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Exporting the addToCart, removeFromCart, and getCart functions for use in other files
export { addToCart, removeFromCart, getCart };
