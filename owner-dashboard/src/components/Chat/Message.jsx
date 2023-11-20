import "./Message.css";
import { format } from "timeago.js";
import porfileImage from '../../assets/images/man.png'




const Message = ({ message, own }) => {






    return (

        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {!own && (<img className="messageImg" src={porfileImage} alt="" />)}
                <p className="messageText bg-red-500">{message.message}
                </p>
                {own && (<img className="ownMessageImg" src={porfileImage} alt="" />)}

            </div>
            <div className="messageBottom ">{format(message.createdAt)}</div>

        </div>

    )








}

export default Message
