import mongoose from "mongoose";

const routeSchema = mongoose.Schema({
    name: String,
    stations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stations' // Referring to the Station model
    }]

})

const routeModel = mongoose.model('route', routeSchema)
export default routeModel