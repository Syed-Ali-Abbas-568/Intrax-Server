import stationModel from "../models/stationSchema.js";

// Controller to add a new station
export const addStation = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, latitude, longitude } = req.body;

    // Create a new station instance
    const newStation = new stationModel({
      name,
      latitude,
      longitude,
    });

    // Save the station to the database
    const savedStation = await newStation.save();

    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Error adding station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllStations = async (req, res) => {
  try {
    // Fetch all stations from the database
    const stations = await stationModel.find();

    res.status(200).json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getStationByID = async (req, res) => {
  try {
    const stationId = req.params.id; // Assuming the station ID is passed as a parameter in the request

    // Fetch the station from the database using the ID
    const station = await stationModel.findById(stationId);

    if (!station) {
      // If station is not found, return 404 Not Found
      return res.status(404).json({ error: 'Station not found' });
    }

    // If station is found, return it
    res.status(200).json(station);
  } catch (error) {
    console.error('Error fetching station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};