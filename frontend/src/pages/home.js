import { useEffect } from "react";
//hooks
import {useWorkoutContext} from '../hooks/useWorkoutContext';
import {UseAuthContext} from '../hooks/useAuthContext'; //for authentication of a user on the home page i.e. check if the user is logged in or not

//components
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/WorkoutForm";


const Home = () =>{
    
    const {workouts, dispatch} = useWorkoutContext(); //workouts is the state variable which holds the array of workouts, dispatch is used to update the state

    //user is returned with payload if LOGIN action is committed from authContext authReducer function
    const {user} = UseAuthContext();

     // useEffect is used to fetch data when the component loads from backend
    useEffect(() =>{
        const fetchWorkouts = async () =>{
            const response = await fetch('/api/workouts', {
                headers: {'Authorization': `Bearer ${user.token}`}
            }); // fetch workouts from backend. Note that we don't need to specify the full URL because of the proxy set in package.json to avoid CORS issues
            const json = await response.json(); // parse the response to json

            if(response.ok){ // check if response is ok which means status code 200-299
                dispatch({type: 'SET_WORKOUTS', payload: json}); //update the workouts state with the fetched data using dispatch
            }
        }

        //if user is returned it means the users are authenticated
        if(user){
            fetchWorkouts(); 
        }

    }, [dispatch, user]); // empty dependency array means this useEffect runs only once when the component loads but the dispatch function is included to avoid warnings
    return(
        <div className="home">
            <div className="row p-3">
                <div className="workouts my-3 col-md-8" style={{maxHeight: '80vh', overflowY: 'auto' }}>
                    {workouts && workouts.map((workout)=>(
                        <WorkoutDetails key = {workout._id} workout = {workout} /> //workout = {workout} is used to pass the workout data as prop to workoutDetails component
                    ))}
                </div>
                <div className="col-md-4 my-3">
                    <WorkoutForm />
                </div>
            </div>
        </div>
    )
}

export default Home;