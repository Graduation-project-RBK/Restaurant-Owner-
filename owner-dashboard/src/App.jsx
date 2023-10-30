import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup.jsx"
import Login from "./components/login/Login.jsx"

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
      </Routes>
    </Router>

  )
}

export default App
