import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "./ShowTodos.scss"
import { useDispatch } from "react-redux";
import { deleteTodo, markComplete, todoUpdate } from "../../redux/slices/todoSlice";
import { useState } from "react";



const ShowTodos = ({todo}) => {
    const [showUpdate,setShowUpdate] = useState(false);
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const dispatch = useDispatch();

    const deleteTodoHandler = () => {
        dispatch(deleteTodo({todoId:todo?._id}))

    }
    
    const checkHandler = () => {
        dispatch(markComplete({todoId:todo?._id}));
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(todoUpdate({
            title,
            description:desc,
            todoId:todo?._id
        }))

        setDesc("");
        setTitle("");
    }
    

    return (
        <div className="show-todos-container">
            <div className="show-todos-box">
                <div className="data">
                   <h4>{todo?.title}</h4>
                   <p>{todo?.description}</p>
                </div>
                <div className="icon">
                <FaPencil className="logo" onClick={(e)=>setShowUpdate(prev => !prev)} />
                { todo?.status === "InComplete" && <FaCheck className="logo" onClick={checkHandler} />}
                <MdDelete className="logo" onClick={deleteTodoHandler} />
               
                </div>
            </div>
            {
              showUpdate &&
            <form onSubmit={handleUpdate}>
                <input className="input-box" style={{backgroundColor:"rgb(230, 224, 233)"}} type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input className="input-box" style={{backgroundColor:"rgb(230, 224, 233)"}}type="text" placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} />
                <input className="btn" style={{backgroundColor:"#404f5e"}} type="submit" />
            </form>
            }
        </div>
    )
}

export default ShowTodos;