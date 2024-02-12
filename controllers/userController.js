import userModel from "../models/userSchema.js";
import { hashPassword, comparePassword } from '../helpers/auth.js';

export const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.query;
        //Check if User Exist
        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.json(
                { error: "No user found." }

            )

        }

        //check if password matches:
        const match = await comparePassword(password, user.password)
        //if the user exist we will now assign them a jwt token which is cookie basically and we can now track the user along his pages
        if (match) {
            /*const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            const { _id, name, email } = user
            res.json({ token, user: { _id, name, email } })*/

            return res.json(
                { message: "User Found" }

            )
        }
        else {
            res.json(
                { error: "Incorrect Password Entered" }
            )
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while processing the request' });


    }

}

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
   
    const { phone } = request.query; // Assuming the phone number is in the request parameters
    console.log(phone)

    try {
        // Find a user based on the provided phone number
        const user = await userModel.findOne({ phone });

        // Check if the user was found
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Respond with a status code of 200 and a JSON representation of the user 
        response.status(201).json({message: 'User found'});
    } catch (error) {
        // If there's an error, respond with a status code of 404 and an error message
        response.status(404).json({ message: error.message });   
    }
};