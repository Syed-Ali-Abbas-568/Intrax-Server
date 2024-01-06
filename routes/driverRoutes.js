import express from "express";
import { getDrivers, addDriver } from "../controllers/driverController.js";

// Middleware for project routes

const driverRouter = express.Router()


driverRouter.post('/add', addDriver)
driverRouter.get('/view', getDrivers)




export default driverRouter