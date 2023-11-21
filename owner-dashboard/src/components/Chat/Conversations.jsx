import axios from "../../../services/axios-interceptor";
import { useEffect, useState } from "react";
import "./Conversations.css";
import porfileImage from '../../assets/images/man.png';
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Conversations = ({ customerId }) => {
    const [name, setName] = useState('');
    const { currentChat } = useSelector((state) => state.chat);
    const [latestMessageDate, setlatestMessageDate] = useState([])
    const [latestMessage, setLatesetMessage] = useState([])

    const findCustomerName = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${customerId}`);
            setName(data.fullname);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear();
                navigate('/');
            }
        }
    };

    const getMessages = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3000/api/messages/owner/messages/${customerId}`)
            console.log(currentChat)
            setLatesetMessage(data[data.length - 1].message)
            setlatestMessageDate(data[data.length - 1].createdAt)
        } catch (error) {
            console.log(error)
            if (error && error.response.status === 403 || error && error.response.status === 401) {
                await SecureStore.deleteItemAsync('token')
                navigation.navigate('LoginScreen')
            }
        }

    }

    useEffect(() => {
        findCustomerName();
        getMessages()
    }, []);



    return (
        <div
            className={`conversation ${customerId === currentChat ? 'selected' : ''}`}

        >

            <div className="convoInfo">
                <img
                    className="conversationImg"
                    src={porfileImage}
                    alt=""
                />
                <span className="conversationName">{name}</span>



            </div>
            <div className="moreConvoInfo">
                <span className="latest">{latestMessage.length > 20 ? latestMessage.slice(0, 20) + '...' : latestMessage}</span>
                <span className="timeAgo">{format(latestMessageDate)}</span>
            </div>
        </div>
    );
};

export default Conversations;
