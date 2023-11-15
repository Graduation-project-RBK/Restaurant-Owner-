import axios from '../../../services/axios-interceptor.js';
import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";
import './Checkout.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutForm = ({ showCheckout }) => {

    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()

    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true)

        try {

            const { error } = await stripe.confirmPayment({

                elements,
                confirmParams: {
                    return_url: `http://localhost:5173/home`
                },
                redirect: 'if_required'
            })



            if (error) {
                setMessage(error.message)
                console.log(error.message)
                setIsProcessing(false)
                toast.error("Couldn't complete payment.")
            }

            else {
                const { data } = await axios.put(`http://localhost:3000/api/payments/premium`)
                console.log(data.payment)
                toast.success("Your Premium membership is successfully activated!");
                navigate('/home')
            }


            setIsProcessing(false)

        } catch (error) {
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                toast.error("You need to be logged in.")
                navigate('/')
                return
            }




        }
    }

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="button-container-payment">

                <button className='paymentButton' disabled={isProcessing} id='submit'>
                    <span>
                        {isProcessing ? 'Processing...' : 'Pay now'}
                    </span>
                </button>
                <button className='backButton' onClick={showCheckout} >
                    <span>
                        Back
                    </span>
                </button>
            </div>

        </form >
    );
};

export default CheckoutForm;