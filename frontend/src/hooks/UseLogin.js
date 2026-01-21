import { useState } from "react";
import { UseAuthContext } from "./useAuthContext";

export const UseLogin = ()=>{
    const [error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);
    const {dispatch} = UseAuthContext();

    const login = async (email, password) =>{
        setIsLoading(true) // since the login function is beginning to run it should be loading now
        setError(null) //initially error should be null

        //sending request for login with body of email and password to the server/database
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await response.json(); //convert response from database into json object

        if(!response.ok){
            //json must have error in its object, which is returned by statics login we created on userModel 
            setError(json.error)
            setIsLoading(null)
        }

        if(response.ok){
            // meaning the response had status(200) which relates to ok
            // json must be carrying email and token which the authController returns after successfull login
            //to let the user stay logged in, when they leave the website or close the compupter, we save their token on local machine
            localStorage.setItem('user', JSON.stringify(json)) //JSON.stringigy() converts json object into a string

            //use dispatch global method to update the global context of authContext.js
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(null)
            setError(null)
        }
    }
    return {login, error, isLoading}
}