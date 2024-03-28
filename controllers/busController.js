import BusModel from "../models/busSchema.js";

export const addBus = async (request, response) => {
    try {
        const newBus = new BusModel(request.body);
        await newBus.save();
        response.status(201).json(newBus);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
};

export const getBuses = async (request, response) => {
    try {
        const busList = await BusModel.find({});
        response.status(200).json(busList);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
};

export const deleteBus = async (request, response) => {
    try {
        const result = await BusModel.deleteOne({ _id: request.params.id });
        if (result.deletedCount === 0) {
            return response.status(404).json({ error: 'Bus was not found' });
        }
        response.json({ message: 'Bus Successfully Deleted' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateBus = async (request, response) => {
    try {
        const updatedBus = await BusModel.findByIdAndUpdate(
            { _id: request.params.id },
            { $set: request.body },
            { new: true }
        );
        if (!updatedBus) {
            return response.status(404).json({ error: 'Bus not found' });
        }
        response.json(updatedBus);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
