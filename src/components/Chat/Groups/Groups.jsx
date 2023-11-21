import {getGroupsRoute} from '../../../utils/APIRoutes'
import axios from "axios";
import {setConversations} from "../../../redux/conversation/conversationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TimeAgo from "react-timeago";
import Conversation from "../Messages/Conversation";

function Groups() {
    // console.log("groups")
    const [groups, setGroups] = useState([]);
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();
    const getAllGroups = async () => {
        try {
            const response = await axios.get(`${getGroupsRoute}/${user._id}`);
            const groups = response.data;
            setGroups(groups);
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        getAllGroups();
    }, [user])

    // console.log(groups);


    return <>
        <ul>
            {
            groups.map((gr) => (
                <li key={gr._id}>
                    {/*<img/>*/}
                    <div className="chat_list_info_wrapper">
                        <div className="chat_list_item_wrapper">
                            <h3 className="chat_list_item_username">{gr.name}</h3>
                            <div><TimeAgo date={gr.createdAt}/></div>
                        </div>
                        <p>Message</p>
                    </div>
                </li>
            ))
        }

        </ul>
    </>
};


export default Groups;