// Importing the Express framework
import express from 'express';

// Importing the controller functions for handling user operations
import { loginUser, registerUser } from '../controllers/usercontrollers.js';

// Creating an Express router instance
const userRouter = express.Router();

// Route for user registration
userRouter.post('/register', registerUser);

// Route for user login
userRouter.post('/login', loginUser);

// Exporting the userRouter for use in other files
export default userRouter;
