import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import { useSelector } from 'react-redux';
import axios from "axios";
import ExpiredReservationTableList from "./ExpiredReservationTableList.jsx";
import NavBar from "./Navbar.jsx";









function ReservationHistory() {

    const { ownerId } = useSelector((state) => state.restaurant);

    const [history, setHistory] = useState([])

    const getExpiredReservations = async () => {

        try {


            const response = await axios.get(`http://localhost:3000/api/restaurants/${ownerId}`)

            const { data } = await axios.get(`http://localhost:3000/api/reservations/resolved/${response.data.id}`)
            setHistory(data)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getExpiredReservations()
        console.log(ownerId)
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