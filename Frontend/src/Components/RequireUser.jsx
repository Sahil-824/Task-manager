import { Navigate, Outlet} from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager"


const RequireUser = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
   
    return (
        <div>
          {user ? <Outlet/> : (<Navigate to="/login"/>) } 
        </div>
    )
}

export default RequireUser;