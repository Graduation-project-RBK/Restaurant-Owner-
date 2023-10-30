import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3000/", inputs);
            console.log("user added successfully", data)
            navigate("/Login")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form>
            <label htmlFor="email"> Email: </label>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email" />
            <label htmlFor="password"> Password :</label>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password" />
            <div>
                <button type="submit" onClick={handleSubmit}> Login </button>
            </div>
            <p>
                Don't have an account? <span onClick={() => navigate("/Signup")}>Register here</span>
            </p>
        </form>
    )
}

export default Login
