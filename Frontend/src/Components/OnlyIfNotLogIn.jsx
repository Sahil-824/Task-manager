import { Navigate, Outlet } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";

const OnlyIfNotLogIn = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
   
    return (
        <div>
           {user ? (<Navigate to="/"/>) : <Outlet/>} 
        </div>

    )
}

export default OnlyIfNotLogIn;