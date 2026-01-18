const mongoose = require('mongoose');
const User = require('../models/userModel');

// log in function controller
const LoginUser = (req, res)=>{
    res.json({message: 'User logged in'})
}

//sign up function controller
const SignupUser = async (req, res)=>{
    const {email, password} = req.body; //req.body contains the data sent from the client during signup which consists of email and password
    try{
        //use the static signup method defined in userModel to create a new user
        const user = await User.signup(email, password);

        res.status(201).json({email, user}); //201 status code indicates that a new resource has been created successfully
    }catch(error){
        res.status(400).json({error: error.message}); //error.message contains the error thrown from userModel during signup as well as other errors related to the data type of the request body
    }
}

module.exports = {LoginUser, SignupUser};