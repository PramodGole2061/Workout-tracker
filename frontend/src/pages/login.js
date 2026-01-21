import { useState } from "react"
//import UseLogin component/function which returns login function, error and isLoading states
import { UseLogin } from "../hooks/UseLogin";

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //login has actual login mechanism/code while error and isLoading are states
    const {login, error, isLoading} = UseLogin();

    const handleSubmit = async (e)=>{
        e.preventDefault(); 

        //use login function for actual login
        await login(email, password)

        // console.log("Email: ", email, " password: ", password);
    }
    return(
        <div className="container-sm my-4 border border-2 rounded p-3" style={{maxWidth: '400px'}}>
            <form onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
                <label htmlFor="title" className="form-label fw-bold fs-2">Login</label>
            </div>            
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control" id="password" />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" disabled= {isLoading} className="btn btn-primary">Login</button>
            </div>
            {error && <div className="mb-3 text-danger border border-danger my-3 p-2">{error}</div>}
            </form>
        </div>
    )
}

export default Login;