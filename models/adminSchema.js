import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    cnic: { type: String, unique: true },
    gender: String,
    status: String,
    type: String,
    password: String
})

const adminModel = mongoose.model('admin', adminSchema)
export default adminModel