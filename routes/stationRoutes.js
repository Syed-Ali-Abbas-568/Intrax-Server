import express from "express";
import {
  addStation,
  getAllStations,
  getStationByID,
  updateStation,
  deleteStation,
} from "../controllers/stationController.js";

const stationRouter = express.Router();

stationRouter.get('/view', getAllStations);
stationRouter.post('/add', addStation);
stationRouter.get('/:id', getStationByID);
stationRouter.put('/update/:id', updateStation);
stationRouter.delete('/delete/:id', deleteStation);

export default stationRouter;
