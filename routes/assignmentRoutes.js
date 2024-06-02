import express from "express";
import { getAllAssignments, addAssignment, getAllDetailedAssignments, getDetailedAssignmentById, updateAssignment, deleteAssignment } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router()

assignmentRouter.get('/view', getAllAssignments)
assignmentRouter.post('/add', addAssignment)

assignmentRouter.get('/viewdata', getAllDetailedAssignments)

assignmentRouter.get('/:id', getDetailedAssignmentById)

assignmentRouter.put('/:id', updateAssignment);

assignmentRouter.delete('/:id', deleteAssignment);


export default assignmentRouter;