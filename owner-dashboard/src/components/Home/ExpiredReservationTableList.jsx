
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css'
import axios from "../../../services/axios-interceptor.js";
import moment from 'moment'
import { FaComments } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat, setCurrentChatName } from '../../features/chatSlice.js'
import { useNavigate } from "react-router-dom";


function PendingReservationTableList({ reservation }) {

    const [customer, setCustomer] = useState('')
    const { isPremium } = useSelector((state) => state.owner);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const findCustomerName = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${reservation.customerId}`)
            setCustomer(data)
        } catch (error) {
            console.log(error)
            if (error.response.status === 403) {
                navigate('/')
            }
        }
    }

    const startConversation = (customerId, customerName) => {

        dispatch(setCurrentChat(customerId))
        dispatch(setCurrentChatName(customerName))
        navigate('/Messages')
    }

    useEffect(() => {
        findCustomerName()
    }, [])



    return (
        <tr className="border-b border-gray-200">
            <td className="py-5 text-center bg-white text-black flex items-center justify-center">
                {customer.fullname}{isPremium && (<FaComments style={{ fontSize: '20px', marginLeft: '8px', }} className="text-red-500 hover:cursor-pointer"
                    onClick={() => startConversation(customer.id, customer.fullname)} />)}</td>
            <td className="py-2 text-center bg-white">{moment(reservation.date).format("MMM Do YY")}</td>
            <td className="py-2 text-center bg-white">{moment(reservation.time).utcOffset('-000').format('LT')}</td>
            <td className="py-2 text-center bg-white">{reservation.guest_number}</td>
            <td className={`py-2 text-center bg-white ${reservation.status === 'Approved' ? 'text-green-500' : reservation.status === 'Declined' ? 'text-red-500' : ''}`}>
                {reservation.status}
            </td>
        </tr>
    );
}

export default PendingReservationTableList