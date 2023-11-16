import React from "react";
import './Messages.css'
import NavBar from "../Home/Navbar";
import { format } from "timeago.js";
import Conversations from "./Conversations.jsx";
import Message from "./Message.jsx";


const Messages = () => {




    return (
        <div>
            <NavBar />
            <div className="messenger">

                <div className="chatMenu"></div>
                <div className="chatMenuWrapper">
                    <Conversations />
                </div>
                <div className="chatBox"></div>
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Write something..."></textarea>
                        <button className="chatSubmitButton bg-red-600">Send</button>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Messages;