import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup.jsx"
import Login from "./components/login/Login.jsx"
import RestaurantForm from './components/addRestaurant/RestaurantForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
        path="/add-restaurant"
        element={<RestaurantForm/>}
        />
      </Routes>
    </Router>

  )
}

export default App
