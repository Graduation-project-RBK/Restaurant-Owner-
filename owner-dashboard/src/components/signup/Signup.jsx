import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./signup.css"
function Signup() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        if (name === "firstName" || name === "lastName") {
            setInputs(values => ({ ...values, fullname: `${values.firstName} ${values.lastName}` }));
        }
    };
    const validator = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!emailRegex.test(inputs.email)) {
            toast.error('Invalid email format');
            return false;
        }
        if (!passwordRegex.test(inputs.password)) {
            toast.error("Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator()) {
            try {
                const { data } = await axios.post("http://localhost:3000/api/owners/", inputs);
                console.log("user added successfully", data)
                toast.success("Successfully Signed Up")
                navigate("/Login")
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.error === "Email already exists") {
                    toast.error("Email already exists. Please use a different email address.");
                } else {
                    console.log(error);
                }
            }
        }

    }
    return (

        <form>
            <label htmlFor="firstName"> First Name: </label>
            <input
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder="Enter your first name" />
            <label htmlFor="lastName"> Last Name: </label>
            <input
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Enter your last name" />
            <label htmlFor="email"> Email: </label>
            <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email" />
            <label htmlFor="password"> Password: </label>
            <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password" />
            <div>
                <button type="submit" onClick={handleSubmit}> Signup </button>
            </div>
            <p>
                Already have a account? <span onClick={() => navigate("/Login")}>Login here</span>
            </p>
        </form>
    )
}

export default Signup