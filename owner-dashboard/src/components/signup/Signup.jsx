import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import "./signup.css"


function Signup() {
    const [inputs, setInputs] = useState({});
    const [personalId, setPersonalID] = useState(null)
    const [taxDeclaration, setTaxDeclaration] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handlePersonalIdChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPersonalID(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleTaxDeclarationChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setTaxDeclaration(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const validator = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!emailRegex.test(inputs.email)) {
            toast.error("Invalid email format");
            return false;
        }
        if (!passwordRegex.test(inputs.password)) {
            toast.error(
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and at least 8 characters long."
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator()) {
            setLoading(true);
            try {

                const formData = new FormData();
                formData.append("fullname", `${inputs.firstName} ${inputs.lastName}`);
                formData.append("email", inputs.email);
                formData.append("password", inputs.password);
                formData.append("personalId", personalId);
                formData.append("taxDeclaration", taxDeclaration);

                const { data } = await axios.post("http://localhost:3000/api/owners/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setLoading(false);
                toast.success("Account created successfully. Please check your email for verification instructions.");

            } catch (error) {
                if (
                    error.response &&
                    error.response.status === 400 &&
                    error.response.data.error === "Email already exists"
                ) {
                    toast.error("Email already exists. Please use a different email address.");
                } else {
                    console.log(error);
                }
            }
        }
    };

    return (
        <div className="bg-img">
            <div className="content">
                <header>Signup Form</header>
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="firstName"></label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            placeholder="Enter your first name" />
                    </div>
                    <div className="field space">
                        <label htmlFor="lastName"></label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            placeholder="Enter your last name" />
                    </div>
                    <div className="field space">
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
                    <div className="field space">
                        <label htmlFor="fileInput" > </label>
                        <input id="fileInput" type="file" accept="image/*" onChange={handlePersonalIdChange} />
                    </div>
                    <div className="field space">
                        <label htmlFor="fileInput"> </label>
                        <input id="fileInput" type="file" accept="image/*" onChange={handleTaxDeclarationChange} />
                    </div>
                    <div className="field space">
                        <input type="submit" value="Signup" />
                    </div>
                    <div className="login">
                        Already have a account? <span onClick={() => navigate("/")}>Login here</span>
                    </div>
                </form>
            </div>
            {loading && (
                <div className='loading'>
                    <div className='spinner'></div>
                </div>
            )}
        </div>
    )
}

export default Signup
