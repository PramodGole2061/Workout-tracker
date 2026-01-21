// express is required to create route handlers
const express = require('express');
// workout model is imported to interact with the workouts collection in the database
const workoutModel = require('../models/workoutModels');

const {
    createWorkout, 
    getAllWorkouts, 
    getWorkoutById, 
    deleteWorkout, 
    updateWorkout
} = require('..//controllers/workoutControllers'); // import controller functions

const requireAuth = require('../middleware/requireAuth')

// here router is created to define route handlers separately, it is the main object to define routes
const router = express.Router();

//this line will call the requireAuth function which will check user's token to see if the user
// is authorized or not. If the user is not authorized then it will respond with one of two errors.
//otherwise it will hit next(), which means one of the routes below will be reached
router.use(requireAuth)

// different route handlers for workouts
// get route handler to fetch all workouts
router.get('/', getAllWorkouts); // use the getAllWorkouts controller function to handle GET requests

// get a single workout by id
router.get('/:id', getWorkoutById); // use the getWorkoutById controller function to handle GET requests with id parameter)

//post to add a new workout
router.post('/', createWorkout); // use the createWorkout controller function to handle POST requests

//update a workout by id
router.patch('/:id', updateWorkout); // use the updateWorkout controller function to handle PATCH requests with id parameter    

//delete a workout by id
router.delete('/:id', deleteWorkout); // use the deleteWorkout controller function to handle DELETE requests with id parameter

module.exports = router;