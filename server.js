import express from 'express';
import dotenv from "dotenv";


import cors from "cors";

import bodyParser from "body-parser";
import mongoose from 'mongoose';

import driverRouter from './routes/driverRoutes.js';
import adminRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import busRouter from './routes/busRoutes.js';
import stationRouter from './routes/stationRoutes.js';
import routeRouter from './routes/routeRouter.js';
import assignmentRouter from './routes/assignmentRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8001;

//Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('IntraxDB has been successfully connected'))
    .catch((err) => console.log('Database Connection failed ', err))




//Middleware


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }))



// Enable CORS for all routes

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

//AdminRoutes

app.use('/', adminRouter)

//Driver Routes 
app.use('/driver', driverRouter)

//User Routes
app.use('/user', userRouter)

app.use('/bus', busRouter)
//Station Routes
app.use('/station', stationRouter)

//Driver Routes
app.use('/route', routeRouter)


//Assignment Router
app.use('/assignment', assignmentRouter)


//feedback Route

app.use('/feedback', feedbackRouter)

app.listen(PORT, () => console.log(`Express Server created successfully on port ${PORT}`))
export default app;


