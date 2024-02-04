import express from "express";
import {addUser, getUserByPhoneNumber } from "../controllers/userController.js";

const userRouter = express.Router()


userRouter.get('/find', getUserByPhoneNumber)
userRouter.post('/add', addUser)





export default userRouter