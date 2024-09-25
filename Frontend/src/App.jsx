import { Route, Routes } from "react-router-dom";

import Content from "./Components/Content/Content";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";

import OnlyIfNotLogIn from "./Components/OnlyIfNotLogIn";
import RequireUser from "./Components/RequireUser";
import Home from "./Pages/Home";
import Landing from "./Components/Landing/Landing";

function App() {
  return (
    <div className="app-container">
      <Toaster />

      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/home/:date" element={<Content />}></Route>
          </Route>
        </Route>

        <Route element={<OnlyIfNotLogIn />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
