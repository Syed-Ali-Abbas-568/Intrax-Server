// import admin from "../models/adminSchemas"
import { hashPassword, comparePassword } from '../helpers/auth.js';
import adminModel from '../models/adminSchema.js';
import jwt from 'jsonwebtoken';



export const test = (req, res) => {
    res.send('Test is working');
    // res.json('test is working');

};


//Register Endpoint
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, phone, cnic, gender, status, type, password } = req.body;
        //Checking if all parameters are entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        };

        //Check if password is good
        if (!email) {
            return res.json({
                error: 'Email is required'
            })
        };

        if (!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long'
            })
        };

        //Check if email is already in use

        const exist = await adminModel.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            })
        };

        const hashedPassword = await hashPassword(password)
        const newAdmin = await adminModel.create({
            name, email, phone, cnic, gender, status, type, password: hashedPassword
        })

        return res.json(newAdmin);

    } catch (error) {

        console.log(error)
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }

}


//Login User
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check if User Exist
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.json(
                { error: "Sorry, no user with the provided credentials was found. Please double-check your credentials" }

            )

        }

        //check if password matches:
        const match = await comparePassword(password, user.password)
        //if the user exist we will now assign them a jwt token which is cookie basically and we can now track the user along his pages
        if (match) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            const { _id, name, email } = user
            res.json({ token, user: { _id, name, email } })


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

// export const logOutUser = (req, res) => {
//     try {
//         // Clear the token cookie to log out the user
//         res.clearCookie('token');
//         res.json({ message: 'Logged out successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while logging out' });

//     }
// };






// //Get Profile
// export const getProfile = (req, res) => {

//     const { token } = req.cookies;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

//             if (err) throw err;
//             res.json(user)
//         })
//     }
//     else {
//         res.json(null)
//     }


// }


// export const getUserInfo = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }


// }



