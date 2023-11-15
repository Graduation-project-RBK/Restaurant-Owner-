import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import customAxios from "../../../services/axios-interceptor.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PremiumCard from "./PremiumCard.jsx";
import BasicCard from "./BasicCard.jsx";
import "./UpsellPage.css";
import CheckoutForm from "./Checkout.jsx";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch } from "react-redux";
import { setClientSecret } from "../../features/paymentSlice.js";


const UpsellPage = () => {

    const [showCheckout, setShowCheckout] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { clientSecret } = useSelector((state) => state.payment);

    const stripePromise = loadStripe(import.meta.env.VITE_CLIENT_SECRET);

    const toggleCheckout = () => {
        getClientSecret()
        setShowCheckout(!showCheckout)
    }


    const getClientSecret = async () => {

        try {

            const { data } = await axios.post('http://localhost:3000/api/payments/intents')
            dispatch(setClientSecret(data.paymentIntent))

        } catch (error) {
            console.log(error.response.data.message)

        }

    }

    const checkType = async () => {

        try {

            const { data } = await customAxios.get('http://localhost:3000/api/restaurants/myRestaurant')
            if (data.accountType === 'PREMIUM') {
                console.log('already premium')
                navigate('/home')
            }

        } catch (error) {
            console.log(error.response.data.message)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                toast.error("You need to be logged in.")
                navigate('/')
            }
        }
    }





    const logout = () => {
        localStorage.clear();
        navigate('/')
    };


    useEffect(() => {
        checkType()
    })


    return (

        <div className="page">
            <nav className="navbar-upsell bg-red-600">
                <div className="navContainer-upsell">

                    <div className="nav-elements-upsell">

                        <button className="log relative p-2 text-white hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                            onClick={logout}>
                            <span className="sr-only">Log out</span>
                            <svg
                                aria-hidden="true"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path

                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className="card-container">
                {showCheckout && clientSecret && (<div style={{ backgroundColor: 'white', width: '500px', borderRadius: '10px' }}>
                    <Elements stripe={stripePromise} options={{
                        clientSecret, appearance: {
                            theme: 'stripe', variables: {
                                colorPrimary: 'white',
                                colorBackground: 'black',
                                colorText: 'white',
                                colorDanger: '#df1b41',
                                fontFamily: 'Ideal Sans, system-ui, sans-serif',
                                spacingUnit: '5px',
                                borderRadius: '4px',
                                // See all possible variables below
                            }
                        }
                    }}>
                        <CheckoutForm showCheckout={toggleCheckout} />
                    </Elements>
                </div>)}

                {!showCheckout && (
                    <>
                        <div>
                            <BasicCard />
                        </div>
                        <div>


                            <PremiumCard showCheckout={toggleCheckout} />

                        </div>
                    </>
                )}

            </div>
        </div>
    )

}


export default UpsellPage