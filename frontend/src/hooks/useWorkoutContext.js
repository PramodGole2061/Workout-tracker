import { WorkoutContext} from "../contexts/workoutContext"; //importing workoutContext to use in this custom hook
import {useContext} from 'react'; //importing useContext hook from react to access context values

export const useWorkoutContext = ()=>{
    const context = useContext(WorkoutContext); //using useContext hook to access workoutContext values
    
    if(!context){
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider') //throwing error if hook is used outside of workoutContextProvider
     }
     
    return context; //returning the context values to be used in components
}

