import express from "express";
import { getAllAssignments, addAssignment, getAllDetailedAssignments } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router()

assignmentRouter.get('/view', getAllAssignments)
assignmentRouter.post('/add', addAssignment)

assignmentRouter.get('/viewdata', getAllDetailedAssignments)


export default assignmentRouter