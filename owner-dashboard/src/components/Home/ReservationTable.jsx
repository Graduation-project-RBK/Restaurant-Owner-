import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import { useSelector } from 'react-redux';
import axios from "axios";
import PendingReservationTableList from "./PendingReservationTableList.jsx";
import NavBar from "./Navbar.jsx";









function ReservationTable() {

    const { ownerId } = useSelector((state) => state.restaurant);

    const [pending, setPending] = useState([])

    const getPendingReservations = async () => {

        try {


            const response = await axios.get(`http://localhost:3000/api/restaurants/${ownerId}`)

            const { data } = await axios.get(`http://localhost:3000/api/reservations/pending/${response.data.id}`)
            setPending(data)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getPendingReservations()
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {pending.map((reservation) => (

                        <PendingReservationTableList key={reservation.id} reservation={reservation} fetch={getPendingReservations} />

                    ))}

                </table>
            </div>
        </div>

    );
}

export default ReservationTable













