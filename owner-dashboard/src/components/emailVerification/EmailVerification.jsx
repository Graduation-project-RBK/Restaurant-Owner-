import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png"
import "./emailVerification.css"

function EmailVerification() {

    const [validUrl, setValidUrl] = useState(true);
    const { token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.get(`http://localhost:3000/api/owners/verify/${token}`);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmail();
    }, [token]);
    return (
        <>
            {validUrl ? (
                <div className="emailVerficationContainer">
                    <img src={success} alt="success_img" className="success_img" />
                    <h1>Email verified successfully</h1>
                    <Link to="/add-restaurant">
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
