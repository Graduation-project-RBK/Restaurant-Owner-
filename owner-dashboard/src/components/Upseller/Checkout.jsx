import axios from 'axios';
import { useEffect } from 'react';

const CheckoutForm = ({ showCheckout }) => {




    return (
        <form>
            <button style={{ color: 'white' }} onClick={showCheckout}>Submit</button>
        </form>
    );
};

export default CheckoutForm;