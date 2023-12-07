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
            console.log(data)
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

        <div className=""> {/* Add margin-top to create space */}
            <NavBar />
            <table className="mt-5 mx-auto text-xs text-center rtl:text-center text-gray-500 dark:text-gray-400 !bg-white" style={{ width: '70%' }}>
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 text-center" >
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center !bg-white">
                            Customer name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center !bg-white">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center !bg-white">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-center !bg-white">
                            Number of Guests
                        </th>
                        <th scope="col" className="px-6 py-3 text-center !bg-white">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((reservation) => (

                        <ExpiredReservationTableList key={reservation.id} reservation={reservation} />

                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationHistory