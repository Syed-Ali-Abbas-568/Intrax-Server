import express from "express";
import { getBuses, addBus, deleteBus, updateBus } from "../controllers/busController.js";

const busRouter = express.Router();

// Middleware for bus routes

busRouter.post('/add', addBus); // Endpoint to add a new bus
busRouter.get('/view', getBuses); // Endpoint to view all buses
busRouter.delete('/delete/:id', deleteBus); // Endpoint to delete a bus by ID
busRouter.put('/update/:id', updateBus); // Endpoint to update a bus by ID

export default busRouter;
