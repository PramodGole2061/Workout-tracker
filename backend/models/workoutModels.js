const mongoose = require('mongoose'); // becasue mongoose is required to define schemas and models
// schema defines the structure of the documents in a MongoDB collection
// models are used to interact with the collections in the database

const Schema = mongoose.Schema; // Schema defines the structure of the documents in a collection

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true}); // automatically add createdAt and updatedAt fields to the documents)

// model is created using the schema, it represents the collection in the database
const workoutModel = mongoose.model('workout', workoutSchema); // 'workout' is a data collection in the database
module.exports = workoutModel; // export the model to use it in other parts of the application