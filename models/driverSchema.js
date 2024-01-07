import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    cnic: { type: String, unique: true },
    gender: String,
    status: String


})

const driver = mongoose.model('driver', driverSchema)
export default driver