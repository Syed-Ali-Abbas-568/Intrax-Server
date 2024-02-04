import userModel from "../models/userSchema.js";
import { hashPassword, comparePassword } from '../helpers/auth.js';

export const addUser = async (request, response) => {
    const { name, email, phone, gender, password } = request.body;

    try {
        // Check if the email or phone already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            return response.status(400).json({ message: 'User with the same email or phone number already exists' });
        }

        // Create a new user
        const hashedPassword = await hashPassword(password)
        const newUser = new userModel({
            name,
            email,
            phone,
            gender,
            password:hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a status code of 201 (created) and the new user's data
        response.status(201).json(newUser);
    } catch (error) {
        // If there's an error, respond with a status code of 500 and an error message
        response.status(500).json({ message: error.message });
    }
};


export const getUserByPhoneNumber = async (request, response) => {
    const { phone } = request.body; // Assuming the phone number is in the request parameters
  

    try {
        // Find a user based on the provided phone number
        const user = await userModel.findOne({ phone: phone });

        // Check if the user was found
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Respond with a status code of 200 and a JSON representation of the user
        response.status(200).json(user);
    } catch (error) {
        // If there's an error, respond with a status code of 404 and an error message
        response.status(404).json({ message: error.message });
    }
};