import MessageContainer from "./MessageContainer";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {messageRoute} from "../../../utils/APIRoutes";
import {setMessages} from "../../../redux/messageSlice";
import "./messages.css"

function Messages() {
    const user = useSelector(state => state.userData.user);
    const currentConversation = useSelector(state => state.conversationData.currentConversation);
    const messages = useSelector(state => state.messagesData.messages);
    const currentConversationUser = useSelector(state => state.conversationData.currentConversationUser);

    const dispatch = useDispatch();
    const getAllMessages = async () => {
        console.log({currentConversation})
        try {
            const response = await axios.get(`${messageRoute}/${currentConversation._id}`);
            const messages = response.data;
                dispatch(setMessages(messages));
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {

        getAllMessages();

    }, [user, currentConversation, dispatch, currentConversationUser, messages])

    console.log("messages", messages)
    return <div className="message_list_container">
        <ul className="message_list">
            {messages.length !== 0 ? messages.map((message) => (

                <MessageContainer message={message} />)
            ) :
                ""
            }
        </ul>
    </div>
}

export default Messages;