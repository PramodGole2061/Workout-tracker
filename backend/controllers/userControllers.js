const mongoose = require('mongoose');
const User = require('../models/userModel');

//To create a secret token/key and give it to the user's who sign up or login
const jwt = require('jsonwebtoken');

//since it will be used on both sign up and login, create a function to create token
const createToken = (_id)=>{
    // jwt.sign(payload, secretOrPrivateKey, [options, callback]) : payload means a unique key i.e. user's _id, SECRET_KEY that is used to create token, either alogorithm or expiresIn 
    return jwt.sign({_id: _id}, process.env.SECRET_KEY, {expiresIn: '3d'}); //generate unique token
    
}

// log in function controller
const LoginUser = async (req, res)=>{
    const {email, password} = req.body
    try{
        //call statics function for login from userModel
        const user = await User.login(email, password);

        //generate token after login using reusable function
        const token = createToken(user._id);

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//sign up function controller
const SignupUser = async (req, res)=>{
    const {email, password} = req.body; //req.body contains the data sent from the client during signup which consists of email and password
    try{
        //use the static signup method defined in userModel to create a new user
        const user = await User.signup(email, password);

        //create a unique token after sign up for the users
        //call the function that creates token
        const token = createToken(user._id) //createToken returns a token

        res.status(200).json({email, token}); // 200 means ok, so we can use resonse.ok to check if status is 200/ok or not
    }catch(error){
        res.status(400).json({error: error.message}); //error.message contains the error thrown from userModel during signup as well as other errors related to the data type of the request body
    }
}

module.exports = {LoginUser, SignupUser};