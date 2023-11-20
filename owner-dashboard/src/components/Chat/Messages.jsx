import React, { useEffect, useRef, useState } from "react";
import './Messages.css'
import NavBar from "../Home/Navbar";
import Conversations from "./Conversations.jsx";
import Message from "./Message.jsx";
import axios from "../../../services/axios-interceptor.js";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setCurrentChat } from '../../features/chatSlice.js'

const Messages = () => {


    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()
    const socket = useRef()
    const { isPremium } = useSelector((state) => state.owner);
    const { currentChat, currentChatName } = useSelector((state) => state.chat);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getConvos = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/messages/owner/conversations')
            const uniqueConversationsMap = {};
            for (const conversation of data) {
                const { customerId, createdAt } = conversation;
                if (!uniqueConversationsMap[customerId] || new Date(createdAt) > new Date(uniqueConversationsMap[customerId].createdAt)) {
                    uniqueConversationsMap[customerId] = conversation;
                }
            }
            const uniqueConvos = Object.values(uniqueConversationsMap);
            const sortedConvos = uniqueConvos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setConversations(sortedConvos)
        } catch (error) {
            console.log(error.response.data.message)
            if (error.response && error.response.status === 403 && error.response.data.message === "Owner account unauthorized") {
                toast.error("Upgrade to premium to access our chat feature now!");
                navigate('/home')

            }

            else if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const getMessages = async () => {

        if (currentChat) {
            try {

                const { data } = await axios.get(`http://localhost:3000/api/messages/owner/messages/${currentChat}`)
                setMessages(data)
            } catch (error) {
                console.log(error)
                if (
                    error.response &&
                    error.response.status === 403 &&
                    error.response.data.message === "Owner account unauthorized"
                ) {
                    toast.error("Upgrade to premium to access our chat feature now!");
                    navigate('/home')

                }

                else if (error.response.status === 403 || error.response.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            }
        }
        else return
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        socket.current.emit('sendMessage', {
            receiverId: currentChat,
            text: newMessage
        })


        try {

            const { data } = await axios.post(`http://localhost:3000/api/messages/owner/${currentChat}`, { message: newMessage })
            setMessages([...messages, data])
            setNewMessage('')



        } catch (error) {
            console.log(error)
            if (
                error.response &&
                error.response.status === 403 &&
                error.response.data.message === "Owner account unauthorized"
            ) {
                toast.error("Upgrade to premium to access our chat feature now!");
                navigate('/home')

            }

            else if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
            e.target.value = ''
        }
    }

    useEffect(() => {
        getMessages()
        getConvos()

    }, [currentChat])


    useEffect(() => {


        arrivalMessage && currentChat === arrivalMessage.sender &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

    }, [messages])


    useEffect(() => {
        if (!socket.current) {
            socket.current = io("ws://localhost:8900", {
                auth: {
                    token: localStorage.getItem('token')
                }
            });


            socket.current.emit("addUser");
        }

        if (socket.current) {

            socket.current.on("getMessage", (data) => {
                setArrivalMessage({
                    sender: data.senderId,
                    message: data.text,
                    createdAt: Date.now(),
                });
            });

            return () => {
                // Clean up the socket connection when the component unmounts
                // (This will only execute when the entire application unmounts)

                socket.current.disconnect();
                socket.current = null;


            };
        }

    }, []);





    return (
        <div>
            <NavBar />
            <div className="messenger">

                <div className="chatMenu"></div>
                <div className="chatMenuWrapper">
                    {conversations.map((convo) =>
                        <div onClick={() => dispatch(setCurrentChat(convo.customerId))} key={convo.customerId}>
                            <Conversations customerId={convo.customerId} />
                        </div>
                    )}

                </div>

                <div className="chatBox"></div>
                <div className="chatBoxWrapper">
                    {currentChat ? (<>
                        <div className="chatBoxTop">
                            {messages.map((message) =>
                                <div ref={scrollRef} key={message.id}>
                                    <Message message={message} own={message.sender === 'restaurant'} />
                                </div>
                            )}
                            {!messages.length && (
                                <span className="noMessages">Send a message to start conversation with {currentChatName.split(' ')[0]} </span>

                            )}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write something..." onChange={handleChange} onKeyUp={handleEnter} value={newMessage}
                            ></textarea>
                            <button className="chatSubmitButton bg-red-600" onClick={handleSubmit}>Send</button>
                        </div>
                    </>
                    ) : (
                        <span className="noConversation">Open a conversation to start a chat.</span>
                    )}


                </div>


            </div>
        </div>

    )
}

export default Messages;