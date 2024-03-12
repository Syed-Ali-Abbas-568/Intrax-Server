import express from "express";
import { addStation } from "../controllers/stationController.js";
import { getAllStations } from "../controllers/stationController.js";


const stationRouter = express.Router()

stationRouter.get('/view',getAllStations)
stationRouter.post('/add',addStation)
//stationRouter.delete('/delete/:id')

export default stationRouter