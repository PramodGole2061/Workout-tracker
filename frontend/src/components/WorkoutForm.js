import { useState } from "react";
//useWorkoutContext hook to access global workout context
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { UseAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () =>{
    const {dispatch} = useWorkoutContext(); //dispatch function to update the global workout state
    const {user} = UseAuthContext();

    const [title, setTitle] = useState('');
    const[load, setLoad] = useState('');
    const[reps, setReps] = useState('');
    const[error, setError] = useState(null); // this one is set to null because initially there is no error
    const [emptyFields, setEmptyFields] = useState([]); // to track which fields are empty

    const handleSubmit = async (e) =>{
        e.preventDefault(); // prevent the default behavior of form submission which refreshes the page

        if(!user){
            setError('You must be logged in.')
            return;
        }
        const workout = {title, load, reps}; // create a workout object with the input values

        // send a POST request to the backend to create a new workout
        const response = await fetch('/api/workouts',{
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }); 

        // this line will parse the response from the backend
        // this will be either the newly created workout or an error message
        const json = await response.json(); // parse the response to json

        if(!response.ok){
            setError(json.error); // if response is not ok, set the error state to the error message from backend
            setEmptyFields(json.emptyFields); // set the emptyFields state to the array of empty fields from backend
        }

        if(response.ok){
            setError(null); // clear any previous error
            setEmptyFields([]); // clear the emptyFields state
            
            setTitle(''); // clear the title input
            setLoad(''); // clear the load input
            setReps(''); // clear the reps input
            console.log("new workout added", json); // log the newly created workout

            dispatch({type: 'CREATE_WORKOUT', payload: json}); //update the global workout state with the new workout
        }
    }

    return(
        <div className="workoutForm container my-3 ">
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Add a new workout</strong></label>
                </div>            
                <div className="mb-3 text-success">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} className= {`form-control ${emptyFields.includes('title') ? 'border-danger' : ''}`} id="title" placeholder="Enter title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="load" className="form-label">Load</label>
                    <input type="number" onChange={(e)=>{setLoad(e.target.value)}} value={load} className={`form-control ${emptyFields.includes('load') ? 'border-danger' : ''}`} id="load" placeholder="Enter load (kg)" />
                </div>
                <div className="mb-3">
                    <label htmlFor="reps" className="form-label">Reps</label>
                    <input type="number" onChange={(e)=>{setReps(e.target.value)}} value={reps} className={`form-control ${emptyFields.includes('reps') ? 'border-danger' : ''}`} id="reps" placeholder="Enter reps" />
                </div>                        
                <button type="submit" onClick={handleSubmit} className="btn btn-success">Submit</button>
                {error && <div className="mb-3 text-danger border border-danger my-3 p-2">{error}</div>}
            </form>
        </div>
    )
}

export default WorkoutForm;