import feedbackModel from "../models/feedbackSchema.js";

export const addfeedback = async (request, response) => {
    try {
        const newFeedback = new feedbackModel(request.body);
        await newFeedback.save();
        response.status(201).json(newFeedback);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
};

export const getFeedback = async (request, response) => {
    try {
        const feedbackList = await feedbackModel.find({});
        response.status(200).json(feedbackList);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
};

export const deleteFeedback = async (request, response) => {
    try {
        const result = await feedbackModel.deleteOne({ _id: request.params.id });
        if (result.deletedCount === 0) {
            return response.status(404).json({ error: 'Feedback was not found' });
        }
        response.json({ message: 'Feedback Successfully Deleted' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
