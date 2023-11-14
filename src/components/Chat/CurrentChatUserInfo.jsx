import "./current-chat-user-info.css";
import {useSelector} from "react-redux";

function CurrentChatUserInfo () {
    const currentConversationUser = useSelector(state => state.conversationData.currentConversationUser);

    return <div className="current_chat_user_info_wrapper">
        <div className="current_chat_user_info">
            <h3>{currentConversationUser.username}</h3>
            <span> last seen 2 minutes ago</span>
        </div>
        <div>
            <button className="current_chat_user_info_btn">Search</button>
            <button className="current_chat_user_info_btn">...</button>
        </div>
    </div>
}

export default CurrentChatUserInfo;