
import Todo from "../Todo/Todo";
import "./Landing.scss"

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="landing-box">
              <Todo/>
            </div>
        </div>
    )
}

export default Landing;