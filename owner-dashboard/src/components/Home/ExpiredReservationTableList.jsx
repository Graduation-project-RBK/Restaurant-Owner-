
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import axios from "../../../services/axios-interceptor.js";
import moment from 'moment'









function PendingReservationTableList({ reservation }) {

    const [name, setName] = useState('')


    const findCustomerName = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${reservation.customerId}`)
            setName(data.fullname)
            console.log(data)

        } catch (error) {
            console.log(error)
            if (error.response.status === 403) {
                navigate('/')
            }
        }
    }


    useEffect(() => {
        findCustomerName()
    }, [])



    return  (
        <tr className="border-b border-gray-200">
            <td className="py-2 text-center bg-white">{name}</td>
            <td className="py-2 text-center bg-white">{moment(reservation.date).format("MMM Do YY")}</td>
            <td className="py-2 text-center bg-white">{moment(reservation.time).utcOffset('-000').format('LT')}</td>
            <td className="py-2 text-center bg-white">{reservation.guest_number}</td>
            <td className="py-2 text-center bg-white">
                    {reservation.status}
                </td>
        </tr>
    );
}

export default PendingReservationTableList