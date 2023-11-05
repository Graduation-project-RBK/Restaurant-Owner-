import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"

function Login() {
    const [inputs, setInputs] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/owners/signin", inputs);
            toast.success("Successfully Logged In")
        } catch (error) {
            if (error.response && error.response.status === 410 && error.response.data.error === "Email doesn't exist") {
                toast.error("Please provide a correct email");
            } else if (error.response && error.response.status === 411 && error.response.data.error === "unvalid password") {
                toast.error("Please provide a correct password");
            } else {
                console.log(error);
            }
        }
    }
    return (
        <div className="bg-img">
            <div className="content">
                <header>Login Form</header>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <span className="fa fa-user"></span>
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email" />
                    </div>
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <label htmlFor="password"></label>
                        <input
                            className="pass-key"
                            type={passwordVisible ? 'text' : 'password'}
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        <span className="show" onClick={togglePasswordVisibility}>
                            {passwordVisible ? 'HIDE' : 'SHOW'}
                        </span>
                    </div>
                    <div className="pass">
                        <span>Forgot Password?</span>
                    </div>
                    <div className="field">
                        <input type="submit" value="LOGIN" />
                    </div>
                    <div className="signup">
                        Don't have an account? <span onClick={() => navigate("/Signup")}>Register here</span>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Login
