import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    gender: String,
    password: String
})

const userModel = mongoose.model('user', userSchema)
export default userModel