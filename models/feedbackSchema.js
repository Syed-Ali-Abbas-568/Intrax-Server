import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },

    rating: {
        type: Number,
    },
    feedback: {
        type: String,

    },


});

const feedbackModel = mongoose.model('feedback', feedbackSchema);

export default feedbackModel;