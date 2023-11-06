import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css";

function Navbar() {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="nav-elements">
                    <ul className="list">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects">Projects</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
