require('dotenv').config(); //load environment variables from .env file

const express = require('express');

// importing files that contain routes to register them in the server.js
//workoutRoutes is imported to use the route handlers defined in workouts.js
const workoutRoutes = require('./routes/workouts');
//userRoutes
const userRoutes = require('./routes/users');

//mongoose is required to connect to MongoDB database
const mongoose = require('mongoose');

//express app initialization 
const app = express();

//global middleware which runs for every request made to the server before reaching the route handlers
app.use(express.json()); // middleware which parses incoming JSON requests and puts the parsed data in req.body
// thus req.body can be used in route handlers to access the data sent in the request body
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next(); //proceed to the next middleware or route handler
});


//Registering routes with the express app
// routes: after receiving a request, send a response back to the client:
// localhost: 4000/api/workouts/ will be handled by the workoutRoutes
//For workout related routes
app.use('/api/workouts',workoutRoutes)
//For user related routes
app.use('/api/users', userRoutes);

//connect to MongoDB database using mongoose
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{ //.then() runs if the connection is successful
    //listen for requests and if the request is received, execute the callback function
    app.listen(process.env.PORT, ()=>{
        console.log("Connected to DB and listening for requests on port ", process.env.PORT);
    })
})
.catch((error)=>{ //.catch() runs if there is an error while connecting to the database
    console.log("Error connecting to DB: ", error);
});
