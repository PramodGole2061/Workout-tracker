import { Link } from "react-router-dom";
//import UseLogout component which will return logout functiion which has logging out code/mechanism
import { UseLogout } from "../hooks/useLogout";
//import UseAuthContext to get access to user state from authContext.js
import { UseAuthContext } from "../hooks/useAuthContext";

const Navbar  = () =>{
    //logout function which has logging out mechanisms
    const {logout} = UseLogout();
    //actual user state
    const {user} = UseAuthContext();

    const handleLogout = ()=>{
        logout()
    }
    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                </div>
            </div>
            <nav>
                {/* if user is not null return this div */}
                {user && (
                <div className="btn-group">
                    <span>{user.email}</span> 
                    <button onClick={handleLogout} className="btn btn-primary mx-2">Log Out</button>
                </div>
                )
                }

                {/* if the user is null return and display this div */}
                {!user &&
                // used button group 
                <div className="btn-group">
                    <Link to="/signup" className="btn btn-primary">Signup</Link>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
                }
            </nav>
            </nav>
        </header>
    )
}

export default Navbar;