
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import axios from "../../../services/axios-interceptor.js";
import moment from 'moment'









function PendingReservationTableList({ reservation }) {

    const [name, setName] = useState('')


    const findCustomerName = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/api/customers/${reservation.customerId}`)
            setName(data.fullname)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        findCustomerName()
    }, [])



    return (
        <tbody>
            <tr>
                <td>{name}</td>
                <td>{moment(reservation.date).format("MMM Do YY")}</td>
                <td>{moment(reservation.time).utcOffset('-000').format('LT')}</td>
                <td>{reservation.guest_number}</td>
                <td>
                    {reservation.status}
                </td>
            </tr>
        </tbody>

    );
}

export default PendingReservationTableList