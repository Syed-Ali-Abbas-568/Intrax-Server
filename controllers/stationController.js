import stationModel from "../models/stationSchema.js";

export const addStation = async (req, res) => {
  try {
    const { name, latitude, longitude, description } = req.body;
    const newStation = new stationModel({
      name,
      latitude,
      longitude,
      description,
    });
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Error adding station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllStations = async (req, res) => {
  try {
    const stations = await stationModel.find();
    res.status(200).json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getStationByID = async (req, res) => {
  try {
    const stationId = req.params.id;
    const station = await stationModel.findById(stationId);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    console.error('Error fetching station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateStation = async (req, res) => {
  try {
    const updatedStation = await stationModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedStation) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json(updatedStation);
  } catch (error) {
    console.error('Error updating station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteStation = async (req, res) => {
  try {
    const result = await stationModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json({ message: 'Station Successfully Deleted' });
  } catch (error) {
    console.error('Error deleting station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
