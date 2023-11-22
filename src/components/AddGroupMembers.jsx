import ModalTitle from "./ModalTitle/ModalTitle";
import ModalWindow from "./ModalWindow/ModalWindow";
import SearchField from "./SearchField/SearchField";
import {useDispatch, useSelector} from "react-redux";
import {setIsNewGroupModalOpen, setIsAddMembersModalOpen} from "../redux/modalsSlice"
import fa from "react-timeago/lib/language-strings/fa";
import {useEffect, useState} from "react";
import axios from "axios";
import {addGroupsRoute, allUsersRoute} from "../utils/APIRoutes";
import "./addGroupMembers.css"
import avatar from "../assets/avatar.jpg";


function AddGroupMembers() {
    const isNewGroupModalOpen = useSelector(state => state.modalsData.isNewGroupModalOpen);
    const isAddMembersModalOpen = useSelector(state => state.modalsData.isAddMembersModalOpen);
    const groupName = useSelector(state => state.modalsData.groupName);
    const dispatch = useDispatch();
    const user = useSelector(state => state.userData.user);
    const [usersList, setUsersList] = useState([]);
    const [groupsMember, setGroupsMember] = useState([user._id]);
    const [groupsMemberNames, setGroupsMemberNames] = useState([]);
    const [selected, setSelected] = useState("");
    const [deleteMemberName, setDeleteMemberName] = useState(undefined);
    const [deleteMemberId, setDeleteMemberId] = useState(undefined);

    const [values, setValues] = useState({
        _id: "",
        username: "",
        email: "",
    })


    const {_id} = user // Призначаємо пустий об'єкт за замовчуванням, якщо curUser є undefined
    useEffect(() => {

        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${allUsersRoute}/${_id}`);
                const users = response.data;
                setUsersList(users);

            } catch (error) {
                console.error(error)
            }
        }
        if (_id) {
            getAllUsers();
        }

    }, [_id]);


    useEffect(() => {
        console.log(groupsMember)
    }, []);

    const onCancelBtnClick = () => {
        // dispatch(setGroupName());
        dispatch(setIsNewGroupModalOpen(true));
        dispatch(setIsAddMembersModalOpen(false));
    }

    const onCreateBtn = async () => {
        const {_id, username, email} = values;
        const {data} = await axios.post(addGroupsRoute, {
            _id,
            name: groupName,
            members: groupsMember,
            admin: user._id,
            filter: "work"
        });
        dispatch(setIsAddMembersModalOpen(false));
    }

    const onUserClick = (event) => {

    }

    const deleteGroupMemberName = () => {
        setGroupsMemberNames(groupsMemberNames.filter(grMembName => grMembName !== deleteMemberName))
    };
    const deleteGroupMemberId = () => {
        setGroupsMember(groupsMember.filter(grMembId => grMembId !== deleteMemberId))
    }


    useEffect(()=>{
deleteGroupMemberName();
deleteGroupMemberId()
    },[deleteMemberName, deleteMemberId])

    return <>
        {isAddMembersModalOpen && <ModalWindow>
            <ModalTitle title={'Add Members'}/>
            <SearchField></SearchField>
            <ul className="groups_members_list">{
                groupsMemberNames.map((m => (
                    <li key={m._id} {...{m}} onClick={onUserClick}>
                        <div>
                            <span>{m}</span>
                            <button className="delete_memb_btn" onClick={()=> {
                                setDeleteMemberName(groupsMemberNames.splice(groupsMemberNames.indexOf(m), 1));
                                setDeleteMemberId(groupsMember.splice(groupsMember.indexOf(m)))
                            }}>x</button>
                            ,
                        </div>
                    </li>
                )))
            }
            </ul>
            <ul>
                {usersList.map((u) => (
                    <li className="member" key={u._id}{...u} onClick={() => {
                        const isUsExist = groupsMemberNames.find(m => m === u.username)
                        if (!isUsExist) {
                            setGroupsMember([...groupsMember, u._id]);
                            setGroupsMemberNames(prevState => [...prevState, u.username]);
                        }
                    }}>
                        <div className="member_card">
                            <div>{u.avatarImage}
                                <img className="chat_list_avatar"
                                     src={u.avatarImage !== "" ? u.avatarImage : avatar}
                                     alt={`Avatar ${u.username}`}/>
                                <div className={selected}></div>
                            </div>
                            <div className="member_card_info">
                                <div>{u.username}</div>
                                <div>{u.email}</div>
                                <div>Last seen 8 min ago</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={onCancelBtnClick}>Cancel</button>
            <button onClick={onCreateBtn}>Create</button>
        </ModalWindow>}
    </>
};

export default AddGroupMembers;