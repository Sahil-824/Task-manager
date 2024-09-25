import "./Todo.scss";

import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();

  const currentDate = new Date();

  
  const year = currentDate.getFullYear();
  
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  
  const todayDate = `${year}-${month}-${day}`;

  return (
    <div className="todo-container">
      <h1>
        Welcome back! Get ready to seize the day and accomplish great things
      </h1>
      <button className="btn" onClick={(e) => navigate(`/home/${todayDate}`)}>
        Get Started
      </button>
    </div>
  );
};

export default Todo;
