import { NavLink, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";


const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axiosClient.post("/auth/login",{
                email,
                password
            })

            setItem(KEY_ACCESS_TOKEN,response.result.token);
            toast.success(response.result.message);
            navigate("/");

        } catch(e){
          
        }
    }


    return (
        <div className="login-container">
        <div className="login-box shadow">
            <h1>Welcome Back</h1>
            <p>Enter your credentials to login</p>
            <form onSubmit={handleSubmit}>
              
               <input className="input-box" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
               <input className="input-box" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
               <input className="btn" type="submit" />
            </form>
            <p>Don't have an account? <NavLink className="link" to="/signup">Sign Up</NavLink></p>
        </div>
    </div>
    )
}

export default Login;