import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png"
import "./emailVerification.css"
import { useDispatch } from 'react-redux';

function EmailVerification() {

    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        const verifyEmail = async () => {
            try {
                console.log(param.token)
                const { data } = await axios.post(`http://localhost:3000/api/owners/verify/${param.token}`);
                console.log(data)
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmail();
    }, []);
    return (
        <>
            {validUrl ? (
                <div className="emailVerficationContainer">
                    <img src={success} alt="success_img" className="success_img" />
                    <h1>Email verified successfully</h1>
                    <Link to="/">
                        <button className="green_btn">Login</button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    )
};

export default EmailVerification
