import { useState } from "react"
//to use useSignup which returns signup function, error and isLoading
import { UseSignup } from "../hooks/useSignup";

const Signup = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // finally we can use signup function, error and isLoading from here
    const {signup, error, isLoading} = UseSignup();

    const handleSubmit = async (e)=>{
        e.preventDefault(); 


        await signup(email, password)

        // console.log("Email: ", email, " password: ", password);
    }
    return(
        // my is margin top and bottom, border-2 gives shade, rounded gives radius, p-3 is padding
        <div className="container-sm my-4 border border-2 rounded p-3" style={{maxWidth: '400px'}}>
            {/* putting onSubmit on form is considered better than using on button  */}
            <form onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
                <label htmlFor="title" className="form-label fw-bold fs-2">Sign Up</label>
            </div>            
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                {/* e is every event on the input, e.target means the field being used and value is typed value */}
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control" id="password" />
            </div>
            {/* bootstrap->buttons->scroll down->long button */}
            <div className="d-grid gap-2">
                {/* if isLoading is set to true disable this button */}
                <button type="submit" disabled = {isLoading} className="btn btn-primary">Sign Up</button>
            </div>
            {/* if theres error show it on a div */}
            {error && <div className="mb-3 text-danger border border-danger my-3 p-2">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;