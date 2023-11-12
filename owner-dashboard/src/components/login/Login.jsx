import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"
import { useDispatch } from 'react-redux';



function Login() {
    const [inputs, setInputs] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            const { data } = await axios.post("http://localhost:3000/api/owners/signin", inputs);
            toast.success("Successfully Logged In")
            console.log(data.payload)
            if (data.message === "User hasn't created a restaurant") {
                localStorage.setItem('token', data.token)

                navigate("/add-restaurant")
            }
            else if (data.message === "owner successfully logged in") {
                localStorage.setItem('token', data.token)
                navigate('/home')

            }

        } catch (error) {
            if (error.response && error.response.status === 410 && error.response.data.error === "Email doesn't exist") {
                toast.error("Please provide a correct email");
            } else if (error.response && error.response.status === 411 && error.response.data.error === "unvalid password") {
                toast.error("Please provide a correct password");
            }
            else if (error.response && error.response.status === 401 && error.response.data.error === "Account not verified. Another verification email has been sent. Please check your email for instructions.") {
                toast.error("Account not verified. Please check your email for verification instructions.")
            }
            else {
                console.log(error);
            }
        }
    }
    return (
        <div className="bg-img">
            <div className="content">
                <header>Login Form</header>
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
                        Don't have an account? <span onClick={() => navigate("/signup")}>Register here</span>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Login
