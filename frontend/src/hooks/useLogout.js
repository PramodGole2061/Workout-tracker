import { UseAuthContext } from "./useAuthContext"; //import UseAuthcontext component which returns dispatch function and global props(..state)
import { useWorkoutContext } from "./useWorkoutContext";

export const UseLogout = () =>{
    const {dispatch} = UseAuthContext();
    const {dispatch: workoutsDispatch} = useWorkoutContext(); //because both of them are dispatch function rename second one as workoutsDispatch

    const logout = ()=>{
        //remove token from browser/local machine
        localStorage.removeItem('user');

        //logout from global context of AuthContext
        dispatch({type: 'LOGOUT'})

        //if we don't reset the SET_WORKOUTS with null payload, when we logout and log in with another account
        //a glimpse of previous accounts data is shown before being replace by the data/workouts of the new looged
        //in user's workouts, it's because the global state was not changed before that
        //thus we set the global workouts to null when an user logs out
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null}) 
    }
    return {logout} // using {} seems to be very important because if we don't it doesn't return the logout function at all
}