import styled from "styled-components";
import MessageContainer from "./MessageContainer";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {messageRoute} from "../../../utils/APIRoutes";
import {setMessages} from "../../../redux/messageSlice";
import "./messages.css"

function Messages() {
    const user = useSelector(state => state.userData.user);
    const messages = useSelector(state => state.messagesData.messages);
    const currentConversation = useSelector(state => state.conversationData.currentConversation);



    const dispatch = useDispatch();
    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const response = await axios.get(`${messageRoute}/${currentConversation._id}`);
                const messages = response.data;
                dispatch(setMessages(messages));
            } catch (err) {
                console.error(err)
            }
        }
        getAllMessages();

    }, [user, currentConversation, dispatch, messages])

    return <div className="message_list_container">
        <ul className="message_list">
            {messages && messages.map((message) => (

                <MessageContainer message={message} />)
            )
            }
        </ul>
    </div>
}

export default Messages;