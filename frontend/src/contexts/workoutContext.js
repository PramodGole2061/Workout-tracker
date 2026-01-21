//useContext hook to create workout context, context will be used to share workout data across components
import { createContext, useReducer } from "react";
//workoutContext is created to share workout data across components
export const WorkoutContext = createContext();

//workoutReducer function to manage state updates based on action types
export const workoutReducer = (state, action) =>{
    switch(action.type){
        case 'SET_WORKOUTS': //'SET_WORKOUTS' action is used to set the workouts state, which means to update the state with a new list of workouts
            return{
                workouts: action.payload //updating workouts state with payload from action
            }
        case 'CREATE_WORKOUT': //'CREATE_WORKOUT' action is used to add a new workout to the existing workouts state
            return{
                workouts: [action.payload, ...state.workouts] //adding new workout to the beginning of workouts array
            }
        case 'DELETE_WORKOUT': //'DELETE_WORKOUT' action is used to remove a workout from the workouts state
            return{
                workouts: state.workouts.filter((workout)=>workout._id !== action.payload._id) //filtering out the workout with the id that matches the payload id
        }
        default:
            return state; //'default' case returns the current state if action type doesn't match any cases
    }
}

//workoutContextProvider component to wrap around components that need access to workout context
export const WorkoutContextProvider = ({children}) =>{ // children prop can be used to pass components that need access to the context
    // useReducer hook to manage workout state, workoutReducer function will handle state updates
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null //initial state where workouts is set to null
    }); 

    return(
        //providing state and dispatch function to child components, who can use them to access and update workout data
        <WorkoutContext.Provider value={{...state, dispatch}}> 
            {children} {/* rendering child components that need access to workout context */}
        </WorkoutContext.Provider>
    )
}

