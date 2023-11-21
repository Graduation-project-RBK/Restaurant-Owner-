import "./Message.css";
import { format } from "timeago.js";
import porfileImage from '../../assets/images/icons8-customer-50.png'
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../services/axios-interceptor.js";




const Message = ({ message, own }) => {

    const [myImage, setMyImage] = useState('')
    const [customerImage, setCustomerImage] = useState('')


    const getRestaurant = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/restaurants/myRestaurant`)
            setMyImage(data.main_image)

        } catch (error) {
            console.log(error)

            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const findCustomerImage = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${message.customerId}`);
            setCustomerImage(data.profilePic);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear();
                navigate('/');
            }
        }
    };

    useEffect(() => {
        getRestaurant()
        findCustomerImage()
    }, [])


    return (

        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {!own && (<img className="messageImg" src={customerImage ? customerImage : porfileImage} alt="" />)}
                <p className="messageText bg-red-600">{message.message}
                </p>
                {own && (<img className="ownMessageImg" src={myImage ? myImage : porfileImage} alt="" />)}

            </div>
            <div className="messageBottom ">{format(message.createdAt)}</div>

        </div>

    )








}

export default Message
