import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
    shiftname: String,

    assignedRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'routes' // Referring to the routes model
    },

    assignedBus: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'buses' //Reffering to the bus model
    }


})

const assignmentModel = mongoose.model('assignment', assignmentSchema)
export default assignmentModel