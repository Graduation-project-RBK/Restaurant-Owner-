import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Table.css';
import axios from "../../../services/axios-interceptor.js";
import PendingReservationTableList from "./PendingReservationTableList.jsx";
import NavBar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


function ReservationTable() {
    const navigate = useNavigate();
    const [pending, setPending] = useState([])
    const { show } = useSelector(state => state.decline);
    const { shows } = useSelector(state => state.accept);

    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
  


    const getPendingReservations = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/restaurants/myRestaurant`);
            const { data } = await axios.get(`http://localhost:3000/api/reservations/pending/${response.data.id}`);
            setPending(data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear();
                navigate('/');
            }
        }
    };

    useEffect(() => {
        console.log("showDeclineModal:", showDeclineModal);
        console.log("showAcceptModal:", showAcceptModal);
        getPendingReservations();
    }, [showDeclineModal,show,shows,showAcceptModal]);

    return (
        <div className=" "> {/* Add margin-top to create space */}
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
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pending.map((reservation) => (
                        <PendingReservationTableList key={reservation.id} reservation={reservation} fetchs={getPendingReservations} setShowDeclineModal={setShowDeclineModal} setShowAcceptModal={setShowAcceptModal}/>
                    ))}
                </tbody>
            </table>
           
        </div>
    );
}

export default ReservationTable;
