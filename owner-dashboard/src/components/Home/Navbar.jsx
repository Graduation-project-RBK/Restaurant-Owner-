import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from "../../../services/axios-interceptor.js";
import { setNotificationBadge } from "../../features/notificationSlice";

import './Nav.css'

function NavBar() {
    const [notificationNumber, setNotificationNumber] = useState(1)

    const dispatch = useDispatch();

    const { ownerId } = useSelector(state => state.restaurant);
    const { notificationBadge } = useSelector(state => state.notification);
    const checkNotification = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/owners/notification`)
            dispatch(setNotificationBadge(data))

            console.log(notificationBadge)
        } catch (error) {
            console.log(error)
        }

        if (notificationBadge) {

            try {
                const response = await axios.get(`http://localhost:3000/api/restaurants/myRestaurant`)

                const { data } = await axios.get(`http://localhost:3000/api/reservations/pending/${response.data.id}`)
                setNotificationNumber(data.length)
            } catch (error) {
                console.log(error)

            }
        }
    }

    const removeNotificationBadge = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3000/api/owners/notification`)
            dispatch(setNotificationBadge(data))

        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {

        localStorage.clear()


    }

    useEffect(() => {
        checkNotification()
    }, [])

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
                            <NavLink to="/reservation-list" onClick={removeNotificationBadge}>Pending Reservation Table<span id={notificationBadge ? "circle" : "noCircle"}
                            > {notificationNumber}</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/reservation-history">Reservation History</NavLink>
                        </li>
                        <li>
                            <NavLink to="/" onClick={logout}>Log out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default NavBar