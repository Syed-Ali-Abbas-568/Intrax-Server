import driverModel from "../models/driverSchema.js";

import { generateRandomPassword } from "../helpers/auth.js";
import { sendPasswordKeyDriverEmail } from "../helpers/mailing.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";


export const addDriver = async (request, response) => {

    const randompassword = generateRandomPassword(9)
    const encryptedpassword = await hashPassword(randompassword)
    const modelWithPassword = {
        ...request.body,
        password: encryptedpassword,

    }

    const newDriver = new driverModel(modelWithPassword)

    try {


        await newDriver.save()
        await sendPasswordKeyDriverEmail(request.body.name, request.body.email, randompassword);
        response.status(201).json(newDriver)
    }
    catch (error) {
        response.status(409).json({ message: error.message })
    }

}

export const getDrivers = async (request, response) => {

    try {
        const driverList = await driverModel.find({})
        response.status(200).json(driverList)
    }
    catch (error) {
        response.status(404).json({ message: error.message })
    }

}



export const deleteDriver = async (req, res) => {
    try {
        const result = await driverModel.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Driver was not found' });
        }

        res.json({ message: 'Driver Successfully Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateDriver = async (req, res) => {
    try {
        const updateDriver = await driverModel.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    cnic: req.body.cnic,
                    gender: req.body.gender,
                    status: req.body.status

                },
            },
            { new: true }
        );

        if (!updateDriver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        res.json(updateDriver);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.query;
        //Check if User Exist
        const captain = await driverModel.findOne({ email });
        if (!captain) {
            return res.json(
                { error: "No captain found." }

            )

        }

        //check if password matches:
        const match = await comparePassword(password, captain.password)
        //if the user exist we will now assign them a jwt token which is cookie basically and we can now track the user along his pages
        if (match) {
            /*const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            const { _id, name, email } = user
            res.json({ token, user: { _id, name, email } })*/

            return res.json(
                captain

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
