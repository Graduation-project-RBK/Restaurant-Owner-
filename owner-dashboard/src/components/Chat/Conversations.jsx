import axios from "../../../services/axios-interceptor";
import { useEffect, useState } from "react";
import "./Conversations.css";
import porfileImage from '../../assets/images/man.png'



const Conversations = ({ customerId }) => {

    const [name, setName] = useState('')

    const findCustomerName = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${customerId}`)
            setName(data.fullname)

        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    useEffect(() => {
        findCustomerName()
        console.log()
    }, [])

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={porfileImage}
                alt=""
            />
            <span className="conversationName">{name}</span>

        </div>
    )
}

export default Conversations
