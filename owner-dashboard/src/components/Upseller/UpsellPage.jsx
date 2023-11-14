import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PremiumCard from "./PremiumCard.jsx";
import BasicCard from "./BasicCard.jsx";
import "./UpsellPage.css";
import { NavLink } from "react-router-dom";

const UpsellPage = () => {

    const vite = import.meta.env.VITE_SECRET



    return (

        <div className="page">
            <nav className="navbar-upsell bg-red-600">
                <div className="navContainer-upsell">

                    <div className="nav-elements-upsell">

                        <button className="log relative p-2 text-white hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                        >
                            <span className="sr-only">Log out</span>
                            <svg
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path

                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className="card-container">

                <div>
                    <BasicCard />
                </div>
                <div>
                    <PremiumCard />

                </div>
            </div>
        </div>
    )

}


export default UpsellPage