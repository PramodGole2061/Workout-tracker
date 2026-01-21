import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { UseAuthContext } from "../hooks/useAuthContext";

// date fns
// const { formatDistanceToNow } = require("date-fns"); // this is from date fns documentaion but this doesn't work
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({workout}) =>{
    const {dispatch} = useWorkoutContext();
    const {user} = UseAuthContext();

    const handleClick = async () =>{
        if(!user){
            return;
        }
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json});
        }
    }

    const handleEditClick = () =>{

    }
    return(
        <div className="workoutDetails">
            <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text"><strong>Load (kg): </strong>{workout.load}</p>
                <p className="card-text"><strong>Reps: </strong>{workout.reps}</p>
                <p className="card-text"><strong>Update: </strong>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p> 
                 {/* Delete and Edit are necessary to show the icon from google fonts of material symbols and icons */}
                <span onClick={handleEditClick} className="material-symbols-outlined text-primary p-2 rounded-circle bg-light" style={{cursor: 'pointer', }} >Edit</span>
                <span onClick={handleClick} className="material-symbols-outlined text-danger p-2 rounded-circle bg-light" style={{cursor: 'pointer', }} >Delete</span> 
            </div>
            </div>
        </div>
    )
}

export default WorkoutDetails;