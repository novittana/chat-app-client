import "./messages-field.css"
import Messages from "./Messages/Messages";
import CurrentChatUserInfo from "./CurrentChatUserInfo";
import ChatInput from "../ChatInput";
import {useSelector} from "react-redux";


function MessagesField() {
    const currentConversationsOpen = useSelector(state => state.conversationData.currentConversationOpen);

    return <>
        {currentConversationsOpen ? <div className="messages_field_wrapper">
            <div>
                <CurrentChatUserInfo/>
                <Messages/>
                <ChatInput/>
            </div>
        </div>: <div className="messages_field_title">Select a chat to start messaging</div>}
    </>




}

export default MessagesField;