import "./chat.css"
import ChatList from "./ChatList";
import MessagesField from "./MessagesField";

function Chat (){


    return <div className="chat_container">
        <ChatList/>
        <MessagesField/>
    </div>
}

export default Chat;