import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    cnic: { type: String, unique: true },
    gender: String,
    status: String,
    password: String,

    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignment' // Referring to the assignment model
    }


})

const driverModel = mongoose.model('driver', driverSchema)
export default driverModel