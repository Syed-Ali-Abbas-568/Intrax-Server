import express from "express";
import { addRoute, getAllRoutes, getRouteById } from "../controllers/routeController.js";

const routeRouter = express.Router()

routeRouter.get('/view', getAllRoutes)
routeRouter.post('/add', addRoute)
routeRouter.get('/:id', getRouteById)
//stationRouter.delete('/delete/:id')

export default routeRouter