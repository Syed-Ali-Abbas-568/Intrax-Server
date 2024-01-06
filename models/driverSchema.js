import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    cnic: String,
    gender: String,

})

const driver = mongoose.model('driver', driverSchema)
export default driver