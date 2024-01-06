import express from 'express';
import dotenv from "dotenv";
import driverRouter from './routes/driverRoutes.js';
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from 'mongoose';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8001;

//Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('IntraxDB has been successfully connected'))
    .catch((err) => console.log('Database Connection failed ', err))




//Middleware
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
//app.use('/', )

//Driver Routes
app.use('/driver', driverRouter)

app.listen(PORT, () => console.log(`Express Server created successfully on port ${PORT}`))

