import express from "express";
import requireLogin from "../middlewares/requireLogin.js";
import { getDrivers, addDriver, deleteDriver, updateDriver } from "../controllers/driverController.js";

// Middleware for project routes

const driverRouter = express.Router()


driverRouter.post('/add',requireLogin, addDriver)
driverRouter.get('/view',requireLogin, getDrivers)
driverRouter.delete('/delete/:id',requireLogin, deleteDriver)
driverRouter.put('/update/:id',requireLogin, updateDriver)




export default driverRouter