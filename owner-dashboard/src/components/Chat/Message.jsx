import "./Message.css";
import { format } from "timeago.js";




const Message = ({ own }) => {






    return (

        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                <p className="messageText bg-red-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.

                </p>
            </div>
            <div className="messageBottom ">1 hour ago</div>

        </div>
    )








}

export default Message
