const express = require('express');

const router = express.Router();

//exporting function controllers for user routes
const {LoginUser, SignupUser} = require('../controllers/userControllers');

//log in route
router.post('/login', LoginUser);

//sign up route
router.post('/signup', SignupUser);

// these routes need to be registered in the main server.js file to be functional
module.exports = router; // export the router to be used in other parts of the application