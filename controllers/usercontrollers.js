
import userModel from "../model/usermodel.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Function to create a JWT token
const createToken = (id,role) => {
    return jwt.sign({ id ,role}, process.env.JWT_SECRET);
}

// Function to login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user with the provided email
        const user = await userModel.findOne({ email });
        // If user doesn't exist, return error message
        if (!user) {
            return res.json({ success: false, message: "User Doesn't exists" });
        }
        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        // If passwords don't match, return error message
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        // Create a JWT token with the user's ID and user role
        const token = createToken(user._id,user.role);
          // Set the token as a cookie
    res.cookie("token", token, {
        httpOnly: true, // Prevent client-side JavaScript access
        
        maxAge: 3600000, // 1 hour
      });
        // Send the token in the response
        res.json({ success: true, token,name:user.name });
    } catch (error) {
        // If an error occurs, log the error and return error message
        console.log("Error");
        res.json({ success: false, message: "Error" });
    }
}


// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already exists" });
        }
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a strong password" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role:"buyer",
        });

        // Save the new user to the database
        const user = await newUser.save();
        // Create a JWT token for the new user
        const token = createToken(user._id,user.role);
          // Set the token as a cookie
    res.cookie("token", token, {
        httpOnly: true, // Prevent client-side JavaScript access
        
        maxAge: 3600000, // 1 hour
      });
        // Send the token in the response
        res.json({ success: true, token });
    } catch (error) {
        // If an error occurs, log the error and return error message
        console.log(error);
        res.json({ success: false, message: error });
    }
}


export { loginUser, registerUser }
