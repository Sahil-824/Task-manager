import { useEffect, useState } from "react";
import "./Content.scss"

import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodos } from "../../redux/slices/todoSlice";
import { useNavigate, useParams } from "react-router-dom";
import ShowTodos from "../ShowTodos/ShowTodos";


const Content = () => {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [buttonVal,setButtonVal] = useState("InComplete");
    const [show,setShow] = useState([]);
   
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const date = params.date;

    useEffect(()=>{
      dispatch(getTodos({date}));
    },[params])

    const todos = useSelector(store => store.todoReducer.todos);
    useEffect(() => {
      const filtered = todos?.filter(todo => todo?.status === buttonVal);
      setShow(filtered);
  
  },[todos])


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addTodo({
            title,
            description:desc,
            date
        }))

        setTitle("");
        setDesc("");
       





    }

    const handleDateChange = (e) => {
        navigate(`/home/${e.target.value}`)
    }

    const handleButtonClick = (e) => {
      setButtonVal(e.target.value);

      const filter = todos?.filter(todo => todo.status === e.target.value);
      setShow(filter);

      


  }


    return (
        <div className="content-container">
            <h2>Manage Your Task</h2>
            <div className="todo-box shadow">
                <input className="input-box" type="date" style={{backgroundColor:"rgb(223, 223, 223)"}}value={date} onChange={handleDateChange} />
                <form onSubmit={handleSubmit}>
                   <div className="item1">
                    <label className="input-box" htmlFor="title">Title:</label>
                    <input className="input-box" style={{backgroundColor:"rgb(223, 223, 223)"}} type="text" id="title" placeholder="Title of Task" value={title} onChange={(e)=>setTitle(e.target.value)} />
                   </div>
                   <div className="item2">
                    <label className="input-box" htmlFor="description">Description:</label>
                    <input className="input-box" style={{backgroundColor:"rgb(223, 223, 223)"}}type="text" id="description" placeholder="Description of Task ?" value={desc} onChange={(e)=>setDesc(e.target.value)} />
                   </div>
                   <div className="item3">
                    <input className="btn" type="submit" value="ADD" />
                   </div>

                </form>
                <div className="buttons">
                <button className="btn" style={buttonVal === "InComplete" ? {backgroundColor:"green"} : {}} value="InComplete" onClick={handleButtonClick}>To Do</button>
                    <button className="btn" value="Completed" style={buttonVal === "Completed" ? {backgroundColor:"green"} : {}} onClick={handleButtonClick}>Completed</button>
                </div>
                <div className="content">
                {
                    show.length > 0 && show.map((todo) => <ShowTodos todo={todo} key={todo._id}/>)
                }

                </div>
            </div>
        </div>
    )
}

export default Content;