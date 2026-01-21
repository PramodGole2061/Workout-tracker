const workoutModel = require('../models/workoutModels'); // import the workout model to interact with the workouts collection
const mongoose = require('mongoose'); // import mongoose to validate object ids so that we can check if the provided id meets the criteria of a valid MongoDB ObjectId

// controller function to get all workouts
const getAllWorkouts = async (req, res) => {
    try{
        const user_id = req.user._id;
        const workouts = await workoutModel.find({user_id}).sort({createdAt: -1}); // fetch all workouts from the database, sorted by createdAt in descending order
        res.status(200).json(workouts); // send back the workouts as response with status 200 (OK)
    }catch(error){
        res.status(500).json({error: error.message}); // send back error message with status 500 (Internal Server Error)
    }
}

//function to get a single workout by id
const getWorkoutById = async (req, res) =>{
    try{
        //use req.params to get the id from the request URL
        // if req.body is used, it gets data from the request body
        //differentiate between req.params and req.body is important for route handlers because they serve different purposes while handling requests because req.params is used to extract parameters from the URL path, while req.body is used to extract data sent in the body of the request.
        const {id} = req.params; // use params instead of body to get id from URL if we used req.body, it would be incorrect because id is part of the URL path
        
        //check if the id is a valid MongoDB ObjectId
        if(mongoose.Types.ObjectId.isValid(id) === false){
            return res.status(404).json({error: "No workout found with that id"}); // if id is not valid, send back 404 (Not Found)
        }

        const workout = await workoutModel.findById(id); // find the workout by id in the database
        
        if(!workout){
            return res.status(404).json({error: "No workout found with that id"}); // if no workout is found, send back 404 (Not Found)
        }

        res.status(200).json(workout); // send back the found workout as response with status 200 (OK)
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
// function to create a new workout
const createWorkout = async (req, res) =>{ // async because we are using await inside the function
    const {title, load, reps} = req.body; // extract title, load, reps from the request body
    
    // to handle error for missing fields by showing which fields are missing to the user
    let emptyFields = []; // array to keep track of any missing fields
    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'please fill in all the fields.', emptyFields}); // send back error message with status 400 (Bad Request) if any fields are missing
    }

    try{
        const user_id = req.user._id;
        const workout = await workoutModel.create({title, load, reps, user_id}); // create a new workout document in the database
        //await is used to wait for the create operation to complete
        res.status(200).json(workout); // send back the created workout as response with status 200 (OK)
    }catch(error){
        res.status(400).json({error: error.message}); // send back error message with status 400 (Bad Request)
    }
}

// function to update a workout by id
const updateWorkout = async (req, res) => {
    try{
        const {id} = req.params;
        if(mongoose.Types.ObjectId.isValid(id) === false){
            return res.status(404).json({error: "No workout found with that id"});
        }

        const workout = await workoutModel.findByIdAndUpdate({_id: id}, {...req.body}); // ...req.body spreads or deconstructs the properties of req.body to update the workout document with the new values
        if(!workout){
            return res.status(404).json({error: "No workout found with that id"});
        }

        res.status(200).json(workout);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

// function to delete a workout by id
const deleteWorkout = async (req, res) => {
    try{
        const { id } = req.params;
        if(mongoose.Types.ObjectId.isValid(id) === false){
            return res.status(404).json({error: "No workout found with that id"});
        }

        const workout = await workoutModel.findByIdAndDelete({_id: id}); // _id refers to the unique identifier field in MongoDB documents

        if(!workout){
            return res.status(404).json({error: "No workout found with that id"});
        }

        res.status(200).json(workout);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
}