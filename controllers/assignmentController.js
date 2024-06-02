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



export const getDetailedAssignmentById = async (req, res) => {
    try {
        // Fetch all assignments from the database
        const assignmentID = req.params.id;
        let assignment = await assignmentModel.findById(assignmentID);


        // Map over the assignments and await for all promises to resolve

        const bus = await BusModel.findById(assignment.assignedBus);
        const route = await routeModel.findById(assignment.assignedRoute);
        assignment = { ...assignment.toObject(), assignedBus: bus, assignedRoute: route };
        res.status(200).json(assignment);
    } catch (error) {
        console.error('Error fetching assignment by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateAssignment = async (req, res) => {
    try {
        const assignmentID = req.params.id;
        const { shiftname, assignedRoute, assignedBus } = req.body;
        const updatedAssignment = await assignmentModel.findByIdAndUpdate(
            assignmentID,
            { shiftname, assignedRoute, assignedBus },
            { new: true }
        );
        res.status(200).json(updatedAssignment);
    } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteAssignment = async (req, res) => {
    try {
        const assignmentID = req.params.id;
        await assignmentModel.findByIdAndDelete(assignmentID);
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        console.error('Error deleting assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




