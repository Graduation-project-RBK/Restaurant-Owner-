import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../services/axios-interceptor.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BasicCard.css';

const BasicCard = () => {

    const navigate = useNavigate()

    const basic = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3000/api/payments/basic`)
            console.log(data)
            toast.success("Your Basic membership is successfully activated!");
            navigate('/home')
        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                toast.error("You need to be logged in.")
                navigate('/')
            }
        }
    }

    return (


        <div className="pack-container bg-white">
            <div className="header">
                <p className="title">
                    Basic
                </p>
                <div className="price-container">
                    <span>$</span>0
                    <span></span>
                </div>
            </div>
            <div>
                <ul className="lists">
                    <li className="list">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Upload up to 5 photos
                        </p>
                    </li>
                    <li className="list">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Receive and manage reservations
                        </p>
                    </li>
                    <li className="list">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Receive feedback from customers to improve your services
                        </p>
                    </li>
                    <li className="list">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Set limits on daily reservations for better management.
                        </p>
                    </li>
                    <li className="list">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Increase visibility by being displayed based on customer proximity
                        </p>
                    </li>
                </ul>
            </div>
            <div className="button-container">
                <button type="button" onClick={basic}>
                    Get Free
                </button>
            </div>
        </div>

    )

}


export default BasicCard