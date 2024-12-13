// Importing necessary modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config'; // Loading environment variables
import foodRouter from './routes/foodRoute.js'; // Importing food routes
import userRouter from './routes/userRoute.js'; // Importing user routes
import cartRouter from './routes/cartroute.js'; // Importing cart routes
import orderRouter from './routes/orderRoute.js'; // Importing order routes
import { connectDB } from './config/db.js'; // Importing database connection function

// Initializing Express app
const app = express();
const port = 8800; // Port number for the server

// Connecting to the database
connectDB();

// Middleware setup
app.use(express.json()); // Parsing JSON bodies of incoming requests
app.use(cors()); // Allowing cross-origin requests
app.use(cookieParser())
app.use('/images', express.static('upload')); // Serving static files (images) from the 'upload' directory

// Setting up routes
app.use("/api/food", foodRouter); // Food-related routes
app.use("/api/user", userRouter); // User-related routes
app.use("/api/cart", cartRouter); // Cart-related routes
app.use("/api/order", orderRouter); // Order-related routes

// Root route
app.get('/', (req, res) => {
    res.send("API working"); // Sending a simple response for the root route
});

// Starting the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`); // Logging a message when the server starts
});
