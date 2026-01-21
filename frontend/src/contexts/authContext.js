import { Children, createContext, useEffect, useReducer } from "react";

//authContext root of a global context
export const AuthContext = createContext();

//authReducer represents dispatch which is used to change the value or data or object of state depending on type of action
const authReducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

//AuthContextProvider is used to wrap components which requires or needs to use the global props
export const AuthContextProvider = ({children})=>{
    //here state's value is object or {user: null} initially but it can be changed with dispatch function
    //authReducer is function which has actual code/instructions on changing the value of state depending on the action
    //dispatch is called globally but it is the authReducer for real
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // everytime the website is refreshed check for the token on localStorage
    //to find out if the user is logged in or not
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')); //parse a JSON-formatted string and convert it into a native JavaScript value or object
        //if user is not null meaning there is token in the localStorage keep the user logged in
        if(user){
            dispatch({type: 'LOGIN', payload: user}) //change the state with dispatch
        }

    }, []) // empty [] here means this useEffect function will run only once

    //check what's on the state currently on console
    console.log("authContext: ", state);

    return(
        //actual implementation of global context is here
        //children are components or files that can access global prop i.e. ...state and dispatch function to change the global prop
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}