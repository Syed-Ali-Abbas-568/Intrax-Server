import stationModel from "../models/stationSchema.js";

// Controller to add a new station
export const addStation = async (req, res) => {
    try {
      // Extract data from the request body
      const { name, latitude, longitude, description } = req.body;
  
      // Create a new station instance
      const newStation = new stationModel({
        name,
        latitude,
        longitude,
        description,
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