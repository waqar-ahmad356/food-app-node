// Importing the Express framework
import express from 'express';

// Importing the authentication middleware
import authenticateToken from '../middleware/auth.js';

// Importing the controller functions for handling cart operations
import { addToCart, removeFromCart, getCart } from '../controllers/cartcontroller.js';

// Creating an Express router instance
const cartRouter = express.Router();

// Route for adding an item to the cart
cartRouter.post('/add', authenticateToken, addToCart);

// Route for removing an item from the cart
cartRouter.post('/remove', authenticateToken, removeFromCart);

// Route for retrieving the user's cart
cartRouter.get('/get', authenticateToken, getCart);

// Exporting the cartRouter for use in other files
export default cartRouter;
