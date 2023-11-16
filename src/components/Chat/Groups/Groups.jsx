import {getGroupsRoute} from '../../../utils/APIRoutes'
import axios from "axios";
import {setConversations} from "../../../redux/conversation/conversationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

function Groups () {
    console.log("groups")
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

    useEffect(()=>{
        getAllGroups();
    },[user])

    console.log(groups);
};


export default Groups;