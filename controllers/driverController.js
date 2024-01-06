import driver from "../models/driverSchema.js";


export const addDriver = async (request, response) => {

    const newDriver = new driver(request.body)
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
        const driverList = await driver.find({})
        response.status(200).json(driverList)
    }
    catch (error) {
        response.status(404).json({ message: error.message })
    }

}