
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup.jsx"
import Login from "./components/login/Login.jsx"
import Home from './components/Home/Home.jsx';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/Signup"
          element={<Signup />}
        />
        <Route
          path="/Login"
          element={<Login />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
      </Routes>
    </Router>

  )
}

export default App
