import routeModel from "../models/routeSchema.js";

// Controller to add a new Route


export const addRoute = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, stations } = req.body;
        const newRoute = new routeModel({
            name,
            stations,
        });

        // Save the station to the database
        const savedRoute = await newRoute.save();

        res.status(201).json(savedRoute);
    } catch (error) {
        console.error('Error adding route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const getAllRoutes = async (req, res) => {
    try {
        // Fetch all stations from the database
        const routes = await routeModel.find();
        res.status(200).json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





export const getRouteById = async (req, res) => {
    try {
        const routeId = req.params.id;
        const route = await routeModel.findById(routeId);

        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }


        res.status(200).json(route);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
