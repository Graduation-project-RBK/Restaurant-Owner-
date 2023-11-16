import axios from "../../../services/axios-interceptor";
import { useEffect, useState } from "react";
import "./Conversations.css";




const Conversations = () => {





    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
            />
            <span className="conversationName">John Doe</span>

        </div>
    )
}

export default Conversations
