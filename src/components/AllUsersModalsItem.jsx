import axios from "axios";
import {conversationsRoute} from "../utils/APIRoutes";
import {setIsAllUsersModalListOpen} from "../redux/modalsSlice";
import {useSelector, useDispatch} from "react-redux";
import {
    setCurrentConversation,
    setCurrentConversationOpen,
    setCurrentConversationUser
} from "../redux/conversation/conversationSlice"
import {setMessages} from "../redux/messageSlice";

export default function AllUsersModalsItem({receiver}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData.user);
    const conversationsList = useSelector(state => state.conversationData.conversations);

    const addConversation = async (user, receiver) => {
        try {

            const response = await axios.post(conversationsRoute,
                {
                    senderId: user._id,
                    receiverId: receiver._id,
                    filter: "private"
                });
            dispatch(setCurrentConversation(response.data))
            console.log("Створено нову розмову:", response.data);
            return response.data;
        } catch (error) {
            console.error("Помилка при створенні розмови", error);
        }
    }

    const onUserClick = (event) => {
        const results = conversationsList.map(c => {
            const conv = c;
            const memb = c.members.find(member => member !== user._id);
            if (memb === receiver._id) {
                return conv
            }
        });
        const selectedConv = results.filter(item => item !== undefined);
        if (selectedConv.length === 0) {
            addConversation(user, receiver);
            dispatch(setCurrentConversationUser(receiver));
            dispatch(setMessages([]));
            dispatch(setIsAllUsersModalListOpen(false));
            dispatch(setCurrentConversationOpen(true));


        } else {
            dispatch(setIsAllUsersModalListOpen(false));
            dispatch(setCurrentConversation(selectedConv[0]));
            dispatch(setCurrentConversationOpen(true));
            dispatch(setCurrentConversationUser(receiver));
        }
    }

    return <>
        {
            receiver &&
            <li key={receiver._id}{...receiver} onClick={onUserClick}>
                <div>
                    <div>{receiver.avatarImage}</div>
                    {receiver.username && <div>{receiver.username}</div>}
                    <div>{receiver.email}</div>
                </div>
            </li>
        }
    </>

}