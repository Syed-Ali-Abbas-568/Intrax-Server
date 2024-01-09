import driverModel from "../models/driverSchema.js";


export const addDriver = async (request, response) => {

    const newDriver = new driverModel(request.body)
    try {
        await newDriver.save()
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
