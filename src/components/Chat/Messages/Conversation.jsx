import avatar from "../../../assets/avatar.jpg";
import "./conversation.css";
import {useEffect, useState} from "react";
import {messageRoute, userRoute} from "../../../utils/APIRoutes";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../../../redux/messageSlice";
import TimeAgo from 'react-timeago';




import {
    setCurrentConversation,
    setCurrentConversationOpen,
    setCurrentConversationUser
} from "../../../redux/conversation/conversationSlice"

function Conversation({conversation, currentUserId}) {
    const [currentConversationUs, setCurrentConversationUs] = useState({});
    const [lastMessage, setLastMessage] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const friendId = conversation.members.find(member => member !== currentUserId)

        const getUser = async () => {
            try {
                const response = await axios.get(`${userRoute}/${friendId}`)
                setCurrentConversationUs(response.data);
            } catch (err) {
                console.error(err)
            }
        }
        getUser();

    }, [conversation, currentUserId])


    useEffect(() => {
        const getLastMessages = async () => {
            try {
                const response = await axios.get(`${messageRoute}/${conversation._id}`);
                const gettingMessages = response.data;
                const lastMessage = await gettingMessages[gettingMessages.length - 1];
                setLastMessage(lastMessage);

            } catch (err) {
                console.error(err)
            }
        }

        getLastMessages();


    }, [conversation._id, dispatch]);

    const onConversationClick = () => {
        dispatch(setCurrentConversation(conversation))
        dispatch(setCurrentConversationOpen(true));
        dispatch(setCurrentConversationUser(currentConversationUs))
    }

    // lastMessage.createdAt

    return <>
        <li className="chat_list_item" key={conversation._id} onClick={onConversationClick}>
            <div className="chat_list_info_wrapper">
                <img className="chat_list_avatar"
                     src={currentConversationUs.avatarImage !== "" ? currentConversationUs.avatarImage : avatar}
                     alt={`Avatar ${currentConversationUs.username}`}/>
            </div>
            {lastMessage ?
                <div className="chat_list_info_wrapper">
                    <div className="chat_list_item_wrapper">
                        <h3 className="chat_list_item_username">{currentConversationUs.username}</h3>
                        <div><TimeAgo date={lastMessage.createdAt}/></div>
                    </div>
                    <p>{lastMessage.text}</p>
                </div>
                :
                <div className="chat_list_info_wrapper">
                    <div className="chat_list_item_wrapper">
                        <h3 className="chat_list_item_username">{currentConversationUs.username}</h3>
                    </div>
                </div>
            }
        </li>
    </>


}

export default Conversation;