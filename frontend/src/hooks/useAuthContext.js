import { AuthContext } from "../contexts/authContext"; //already created global context
//useContext allows us to use a global context
import { useContext } from "react";

//From what i understand now, purpose of this hook is simply to make the process of
//using global context(AuthContext) more easily

export const UseAuthContext = ()=>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('AuthContext must be used inside AuthContextProvider.')
    }

    return context; //it basically return global prop(...state) and dispatch function


}