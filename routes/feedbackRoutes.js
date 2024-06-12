import express from "express";
//import { getBuses, addBus, deleteBus, updateBus, updateLocation } from "../controllers/busController.js";

import { getFeedback, addfeedback, deleteFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

// Middleware for bus routes

feedbackRouter.post('/add', addfeedback); // Endpoint to add a new feedback
feedbackRouter.get('/view', getFeedback); // Endpoint to view all feedback
feedbackRouter.delete('/delete/:id', deleteFeedback); // Endpoint to delete a feedback by id


export default feedbackRouter;



