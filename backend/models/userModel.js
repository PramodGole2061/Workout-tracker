const mongoose = require('mongoose');
//for defining schema structure like data types and validation
const Schema = mongoose.Schema;
//for hashing passwords
const bcrypt = require('bcrypt');
//for validating email format and password strength. it has much more methods for all sorts of validation
const validator = require('validator');

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // ensure email addresses are unique by checking existing entries in the database
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true}); // automatically manage createdAt and updatedAt fields

// static method to handle user signup. it is called on userControllers during signup process. Instead of using User.create directly, we can use this method to add extra logic if needed.
userModel.statics.signup = async function(email, password) { //since we are using this inside the method, we cannot use arrow function here
    //validation for email and password
    //check is empty
    if(!email || !password){
        throw Error('All fields must be filled.') //these thrown errors are catched by try{}catch(error){} field.
    }
    //check email format
    if(!validator.isEmail(email)){
        throw Error('Not an email.')
    }
    //check strength of password
    if(!validator.isStrongPassword(password)){
        throw Error('NOt a strong password.')
    }

    const exists = await this.findOne({email}); //this refers to the this model itself
    if(exists){
        throw Error('Email already in use');
    }

    //Using bcrypt to hash passwords
    //Eg: password = mypassword123
    //step1: generate a salt. salt is random strings added to passwords before hashing to enhance security
    //Eg: f9g0hk5466k67l7
    const salt = await bcrypt.genSalt(10); // 10 means number of characters in the salt. the more the characters, the more secure but also more time-consuming for users as well as hackers
    //step2: hash the password along with the salt making the password gibberish
    //Eg: mypassword123+f9g0hk5466k67l7 = dfj45k6j5h4k6j5h4k65j4h65j4h65j4h65
    const hash = await bcrypt.hash(password, salt);
    //step3: create the user with the hashed password
    const user = await this.create({email, password: hash}); //repalce plain password with hashed password
    //when we call signup method on userControllers, it will create a new user with hashed password and return new user object
    return user;
    
}

module.exports = mongoose.model('User', userModel); // export the model to be used in other parts of the application