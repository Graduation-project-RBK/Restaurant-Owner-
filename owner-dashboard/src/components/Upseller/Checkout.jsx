import axios from 'axios';
import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";

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

        const { error } = await stripe.confirmPayment({

            elements,
            confirmParams: {
                return_url: `http://localhost:5173/home`
            },
            redirect: 'if_required'
        })

        if (error) {
            setMessage(error.message)
        }

        setIsProcessing(false)
        showCheckout(false)

    }

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <PaymentElement />
            <button style={{ color: 'white' }} disabled={isProcessing} id='submit'>
                <span>
                    {isProcessing ? 'Processing...' : 'Pay now'}
                </span>
            </button>
        </form >
    );
};

export default CheckoutForm;