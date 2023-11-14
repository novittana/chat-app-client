import "./chat-list.css"
import SearchField from "../SearchField/SearchField";
import axios from "axios";
import {conversationsRoute} from "../../utils/APIRoutes";
import {useEffect} from "react";
import Conversation from "./Messages/Conversation";
import {useDispatch, useSelector} from "react-redux";
import {addFilter} from "../../redux/filterSlice";
import {setConversations, setCurrentConversationList} from "../../redux/conversation/conversationSlice";

function ChatList() {
    const user = useSelector(state => state.userData.user);
    const currentConversationUser = useSelector(state => state.conversationData.currentConversationUser);
    const conversations = useSelector(state => state.conversationData.conversations);
    const filteredConversations = useSelector(state => state.conversationData.currentConversationList);
    const dispatch = useDispatch();

    const getAllConversations = async () => {
        try {
            const response = await axios.get(`${conversationsRoute}/${user._id}`);
            const conversations = response.data;
            dispatch(setConversations(conversations));
        } catch (err) {
            console.error(err)
        }
    }

    const onInputChange = () => {
        const privateConversations = conversations.filter(conv => {
            console.log(conv.members)
        });
    }

    const onEditFolderBtnClick = () => {
        console.log("onEditFolderBtnClick")
    }

    useEffect(() => {
        getAllConversations();
    }, [user, currentConversationUser])

    useEffect(() => {
        dispatch(setCurrentConversationList(conversations));
    }, [conversations, currentConversationUser])


    return (
        <div>
            <form className="search_form">
                <input placeholder='Search' type="text" name="filter" onChange={onInputChange}/>
            </form>
            <ul className="chat_list">
                {filteredConversations.length !== 0 ?
                    filteredConversations.map((c) => (
                        <Conversation key={c._id} conversation={c} currentUserId={user._id} convs={conversations}/>)
                    ) :
                    <div>
                        <h3> No chats currently belong to this folder</h3>
                        <button onClick={onEditFolderBtnClick}>Edit Folder</button>
                    </div>
                }
            </ul>
        </div>
    )
};

export default ChatList;