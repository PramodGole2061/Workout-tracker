import { useState} from "react";
//to use dispatch function to change that global porps(...state) from here
import {UseAuthContext} from './useAuthContext';

//actual component/function that will be called to do signup
export const UseSignup = ()=>{
    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);
    //now dispatch function can be used
    const {dispatch} = UseAuthContext();

    //the actual function that will send
    const signup = async (email, password)=>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/signup',{
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
            
        });

        const json = await response.json(); //it will have email and token or error returned from userController.js

        if(!response.ok){
            setError(json.error);
            setIsLoading(false);
        }

        if(response.ok){
            //save users token on local device so that once the user closes browser and opens website again user will stay logged in
            //to save token/data temporarily use localstaorage
            localStorage.setItem('user', JSON.stringify(json)); //JSON.stringify() converts a json object into a string

            //update the authContext
            dispatch({type: 'LOGIN', payload: json })

            setIsLoading(false)
        }
    }
    return {signup, error, isLoading} // using {} to return these functions and states is very important as without it, the function won't return them
}

