import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import axios from "../../../services/axios-interceptor.js";
import moment from 'moment'
import DeclineModal from "./DeclineModal.jsx";


function PendingReservationTableList({ reservation, fetch , getPendingReservations}) {
    const [name, setName] = useState('')
    const [expoToken, setExpoToken] = useState('')
    const [showDeclineModal, setShowDeclineModal] = useState(false);

    const findCustomerName = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${reservation.customerId}`)
            setName(data.fullname)
            setExpoToken(data.expoToken)
            console.log(data)
        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const acceptReservation = async () => {
        try {
            await axios.put(`http://localhost:3000/api/reservations/approve/${reservation.id}/${expoToken}`)
            fetch()
        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const declineReservation = async () => {
        console.log("setShowDeclineModal:", setShowDeclineModal);
            setShowDeclineModal(true);
    
    }

    useEffect(() => {
        findCustomerName()
    }, [])
    

    return (
        <tr className="border-b border-gray-200">
            <td className="py-2 text-center bg-white">{name}</td>
            <td className="py-2 text-center bg-white">{moment(reservation.date).format("MMM Do YY")}</td>
            <td className="py-2 text-center bg-white">{moment(reservation.time).utcOffset('-000').format('LT')}</td>
            <td className="py-2 text-center bg-white">{reservation.guest_number}</td>
            <td className="py-2 space-x-2 text-center bg-white">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                    onClick={acceptReservation}
                >
                    Accept
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    onClick={declineReservation}
                >
                    Decline
                </button>
            </td>
            {showDeclineModal && <DeclineModal fetch={getPendingReservations} reservation={reservation} setShowDeclineModal={setShowDeclineModal} showDeclineModal={showDeclineModal}/>}
        </tr>
    );
}

export default PendingReservationTableList;
