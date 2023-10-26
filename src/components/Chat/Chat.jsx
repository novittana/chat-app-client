import "./chat.css"
import ChatList from "./ChatList";
import MessagesField from "./MessagesField";
import {useEffect, useRef} from "react";
import io from "socket.io-client";

function Chat (){


    return <div className="chat_container">
        <ChatList/>
        <MessagesField/>
    </div>
}

export default Chat;