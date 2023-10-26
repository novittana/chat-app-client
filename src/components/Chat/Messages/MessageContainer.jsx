import "./message-container.css"
import Message from "./Message";
import avatar from "../../../assets/avatar.jpg"
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";

function MessageContainer({message}) {
    const user = useSelector(state => state.userData.user);
    const messages = useSelector(state => state.messagesData.messages);
    const scrollRef = useRef(null);

    useEffect(() => {

    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, []);

    // console.log(message)
    return <li key={message._id} ref={scrollRef} className={message.sender===user._id ? "message-item own" : "message-item"}>
        <div className="message_container">
            <img className="avatar" src={avatar} alt="Avatar username"/>
            <Message props={message} />
        </div>
    </li>
}

export default MessageContainer;