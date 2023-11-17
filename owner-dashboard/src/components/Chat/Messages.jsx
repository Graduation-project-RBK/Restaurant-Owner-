import React, { useEffect, useRef, useState } from "react";
import './Messages.css'
import NavBar from "../Home/Navbar";
import Conversations from "./Conversations.jsx";
import Message from "./Message.jsx";
import axios from "../../../services/axios-interceptor.js";
import { io } from "socket.io-client";


const Messages = () => {


    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [socket, setSocket] = useState(null)
    const scrollRef = useRef()

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
            console.log(sortedConvos)
            setConversations(sortedConvos)
        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const getMessages = async () => {

        if (currentChat) {
            try {

                const { data } = await axios.get(`http://localhost:3000/api/messages/owner/messages/${currentChat}`)
                console.log(data)
                setMessages(data)
            } catch (error) {
                console.log(error)
                if (error.response.status === 403 || error.response.status === 401) {
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
        try {

            const { data } = await axios.post(`http://localhost:3000/api/messages/owner/${currentChat}`, { message: newMessage })
            setMessages([...messages, data])
            setNewMessage('')

        } catch (error) {
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }

    const handleEnter = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            handleSubmit(e)
            e.target.value = ''
        }
    }

    useEffect(() => {
        getMessages()
        getConvos()
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

    }, [currentChat])

    useEffect(() => {

        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })

    }, [messages])


    useEffect(() => {
        setSocket(io("ws://localhost:8900"))

    }, [])







    return (
        <div>
            <NavBar />
            <div className="messenger">

                <div className="chatMenu"></div>
                <div className="chatMenuWrapper">
                    {conversations.map((convo) =>
                        <div onClick={() => setCurrentChat(convo.customerId)} key={convo.customerId}>
                            <Conversations customerId={convo.customerId} />
                        </div>
                    )}

                </div>

                <div className="chatBox"></div>
                <div className="chatBoxWrapper">
                    {currentChat ? (<>
                        <div className="chatBoxTop">
                            {messages.map((message) =>
                                <div ref={scrollRef}>
                                    <Message message={message} key={message.id} own={message.sender === 'restaurant'} />
                                </div>
                            )}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write something..." onChange={handleChange} onKeyUp={handleEnter}
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