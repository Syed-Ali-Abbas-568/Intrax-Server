import assignmentModel from "../models/assignmentSchema.js";

import routeModel from "../models/routeSchema.js";

import BusModel from "../models/busSchema.js";


// Controller to add a new assignment

export const addAssignment = async (req, res) => {
    try {
        // Extract data from the request body
        const { shiftname, assignedRoute, assignedBus } = req.body;
        const newAssignment = new assignmentModel({
            shiftname,
            assignedRoute,
            assignedBus,
        });

        // Save the station to the database
        const savedAssignment = await newAssignment.save();

        res.status(201).json(savedAssignment);
    } catch (error) {
        console.error('Error adding route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const getAllAssignments = async (req, res) => {
    try {
        // Fetch all stations from the database
        const assignments = await assignmentModel.find();
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




export const getAllDetailedAssignments = async (req, res) => {
    try {
        // Fetch all assignments from the database
        let assignments = await assignmentModel.find();

        // Map over the assignments and await for all promises to resolve
        assignments = await Promise.all(assignments.map(async (assignment) => {
            const bus = await BusModel.findById(assignment.assignedBus);
            const route = await routeModel.findById(assignment.assignedRoute);
            return { ...assignment.toObject(), assignedBus: bus, assignedRoute: route };
        }));

        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};






