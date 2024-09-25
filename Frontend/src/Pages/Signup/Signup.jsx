import { NavLink, useNavigate } from "react-router-dom"
import "./Signup.scss"
import { useState } from "react"
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";

const Signup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axiosClient.post("/auth/signup",{
                name,
                email,
                password
            })

            
            toast.success("Account Created Successfully");
            navigate("/login");

        } catch(e){
           
        }

    }


    return (
        <div className="signup-container">
            <div className="signup-box shadow">
                <h1>Signup</h1>
                <p>Create Your Account</p>
                <form onSubmit={handleSubmit}>
                   <input className="input-box" type="text" placeholder="Username" onChange={(e)=>setName(e.target.value)} />
                   <input className="input-box" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                   <input className="input-box" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                   <input className="btn" type="submit" />
                </form>
                <p>Already have an account? <NavLink className="link" to="/login">Login</NavLink></p>
            </div>
        </div>
    )
}

export default Signup