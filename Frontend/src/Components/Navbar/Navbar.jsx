import "./Navbar.scss"
import { IoIosHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/slices/todoSlice";
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getUserInfo());
    },[])

    const user = useSelector(store => store.todoReducer.user);

    const handleLogOut = () => {
        removeItem(KEY_ACCESS_TOKEN);
        navigate("/login");
        toast.success("LogOut Successfully");

    }


    return (
        <div className="nav-container">
           <div className="nav-box">
            <div className="child1">
              
            <IoIosHome className="icon" onClick={(e)=>navigate("/")} />
            </div>
          
           <div className="child2">
            <div className="user">
            <FaUserCircle className="icon" />
           <p>{user?.name}</p>
            </div>
          
           
          
           <button className="btn" onClick={handleLogOut}>LOGOUT</button>
           </div>

           </div>
        </div>
    )
}

export default Navbar;