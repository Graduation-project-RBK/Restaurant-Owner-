import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [inputs, setInputs] = useState({});
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
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form>
            <label htmlFor="firstName"> First Name </label>
            <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="Enter your first name" />
            <label htmlFor="lastName"> Last Name </label>
            <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Enter your last name" />
            <label htmlFor="email"> Email </label>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email" />
            <label htmlFor="password"> Password </label>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password" />
            <div>
                <button type="submit" onClick={handleSubmit}> Signup </button>
            </div>
            <p>
                Already have a account? <Link to="/"><span>Login here</span></Link>
            </p>
        </form>
    )
}

export default Signup