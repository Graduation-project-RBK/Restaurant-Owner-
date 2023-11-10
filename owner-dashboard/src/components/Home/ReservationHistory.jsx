import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import axios from "../../../services/axios-interceptor.js";
import ExpiredReservationTableList from "./ExpiredReservationTableList.jsx";
import NavBar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";


function ReservationHistory() {

    const navigate = useNavigate()

    const [history, setHistory] = useState([])

    const getExpiredReservations = async () => {

        try {


            const response = await axios.get(`http://localhost:3000/api/restaurants/myRestaurant`)

            const { data } = await axios.get(`http://localhost:3000/api/reservations/resolved/${response.data.id}`)
            setHistory(data)

        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }


    useEffect(() => {
        getExpiredReservations()
    }, [])



    return (
        <div >
            <NavBar />
            <div className="reservation-table">
                <h2>Pending Reservations</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Number of Guests</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {history.map((reservation) => (

                        <ExpiredReservationTableList key={reservation.id} reservation={reservation} />

                    ))}

                </table>
            </div>
        </div>

    );
}

export default ReservationHistory