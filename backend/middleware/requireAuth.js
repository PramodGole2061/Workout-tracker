// the job of middlware is to check the token of the user which is included in the req.headers.authorization
//of every request. req.header.authorization carries Authorization: Bearer <token>.
// middleware will get the token and check it's validity 

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//next means go to next route after this function
const requireAuth = async (req, res, next)=>{
    const {authorization} = req.headers;

    //if authorization is empty/null
    if(!authorization){
        //401: a request to a web resource failed because the client provided invalid or missing authentication credentials
        return res.status(401).json({error: 'Authorization token is required.'})
    }

    //now get the token from the req.headers.authorization
    //Authorization: Bearer <token>.
    const token = authorization.split(' ')[1] //split authorization with ' ' and get token on 2nd position of the array

    try{
    //verify the token
    const {_id} = jwt.verify(token, process.env.SECRET_KEY) //get the id from the destructured token. because token is created using payload which consist of user data like email, password, _id

    //check if the _id exists on the database
    //and if true return the _id
    //store the _id to req by req.user, which means now req.user_id equals _id
    //workout routes which require id will get id using req.user
    //before accessing any workout routes user has to be authorized with above codes/logics
    //Attach the user to the request object. it doesn't striclty need to be user it could be anything and it's just a name
    req.user = await User.findOne({_id}).select('_id'); //instead of returning whole document of the user it will return _id only

    //go to next handler function or workout route like getWorkoutById, createWorkout etc
    next()

    // When a user visits a route like GET /api/workouts, the process looks like this:
    // The Request Starts: The user sends their Token in the header.
    //The Middleware Acts: Your requireAuth function catches the request, verifies the token, finds the _id, and stores it in req.user.
    // The next() Call: Your middleware calls next(). This passes the exact same req object (now carrying the user which holds _id) to your Controller.
    }catch(error){
        return res.status(401).json({error: 'Request is not authorized.'})
    }

}

module.exports = requireAuth