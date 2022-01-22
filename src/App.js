import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Manager from "./components/Managers/Manager";
import Showcard from "./components/Showcard/Showcard";
import Getuser from "./components/Getsingleuser/Getuser";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/manager" element={<Manager />} />
          <Route exact path="/product" element={<Showcard />} />
          <Route exact path="/profile" element={<Getuser />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
