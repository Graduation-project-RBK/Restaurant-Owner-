import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from 'react-router-dom'

import './Nav.css'









function NavBar() {




    return (

        <nav className="navbar">
            <div className="navContainer">
                <div className="logo">
                </div>
                <div className="nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/home">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/reservation-list">Pending Reservation Table</NavLink>
                        </li>
                        <li>
                            <NavLink to="/reservation-history">Reservation History</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Log out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default NavBar