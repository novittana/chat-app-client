import axios from "axios";
import {conversationsRoute} from "../utils/APIRoutes";
import {setIsAllUsersModalListOpen} from "../redux/modalsSlice";
import {useSelector, useDispatch} from "react-redux";
import {setConversations, setCurrentReceiverId} from "../redux/conversation/conversationSlice";
import {useEffect, useState} from "react";
import {
    setCurrentConversation,
    setCurrentConversationOpen,
    setCurrentConversationUser
} from "../redux/conversation/conversationSlice"

export default function AllUsersModalsItem ({receiver, userId}) {
const [membersId, setMembersId] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData.user);
    const conversations = useSelector(state => state.conversationData.conversations);





    const getAllConversations = async () => {
        try {
            const response = await axios.get(`${conversationsRoute}/${user._id}`);
            const conversations = response.data;
            dispatch(setConversations(conversations));
        } catch (err) {
            console.error(err)
        }
    }

    const addConversation = async (user, receiver) => {
        await axios.post(`${conversationsRoute}`, {members:
           [{
               senderId: user._id},
        {receiverId: receiver._id
           }]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ,   filter:"private"})
    }
    // const isConvIncludeMember = membersId

    const onUserClick = (event) => {

    const result = conversations.map(c => {
        const rec = c.members.find(member => console.log(member.id));
        // dispatch(setCurrentConversation(c.id));
        console.log(receiver.id)
        console.log(rec)
        return rec;
    });

        console.log(result)
           dispatch(setIsAllUsersModalListOpen(false));
           dispatch(setCurrentReceiverId(receiver._id))
           addConversation(user, receiver);
        getAllConversations();
    }



    return <>
        {
            receiver &&
            <li key={receiver._id}{...receiver} onClick={onUserClick} >
                <div>
                    <div>{receiver.avatarImage}</div>
                    {receiver.username && <div>{receiver.username}</div>}
                    <div>{receiver.email}</div>
                </div>
            </li>
        }
    </>

}