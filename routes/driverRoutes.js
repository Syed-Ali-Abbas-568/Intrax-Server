import express from "express";
import requireLogin from "../middlewares/requireLogin.js";
import { getDrivers, addDriver, deleteDriver, updateDriver } from "../controllers/driverController.js";
import { loginCaptain} from "../controllers/driverController.js";

// Middleware for project routes

const driverRouter = express.Router()


driverRouter.post('/add', addDriver)
driverRouter.get('/view', getDrivers)
driverRouter.delete('/delete/:id', deleteDriver)
driverRouter.put('/update/:id', updateDriver)
driverRouter.get('/login', loginCaptain)

export default driverRouter