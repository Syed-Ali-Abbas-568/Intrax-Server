import express from "express";
import { getDrivers, addDriver, deleteDriver, updateDriver } from "../controllers/driverController.js";

// Middleware for project routes

const driverRouter = express.Router()


driverRouter.post('/add', addDriver)
driverRouter.get('/view', getDrivers)
driverRouter.delete('/delete/:id', deleteDriver)
driverRouter.put('/update/:id', updateDriver)




export default driverRouter