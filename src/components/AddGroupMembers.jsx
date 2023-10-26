import ModalTitle from "./ModalTitle/ModalTitle";
import ModalWindow from "./ModalWindow/ModalWindow";
import SearchField from "./SearchField/SearchField";
import ContactList from "./ContactList/ContactList";
import Button from "./Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {setIsNewGroupModalOpen, setIsAddMembersModalOpen} from "../redux/modalsSlice"
import fa from "react-timeago/lib/language-strings/fa";
import {useEffect, useState} from "react";
import axios from "axios";
import {addGroupsRoute, allUsersRoute} from "../utils/APIRoutes";
import AllUsersModalsItem from "./AllUsersModalsItem";

function AddGroupMembers() {
    const isNewGroupModalOpen = useSelector(state => state.modalsData.isNewGroupModalOpen);
    const isAddMembersModalOpen = useSelector(state => state.modalsData.isAddMembersModalOpen);
    const groupName = useSelector(state => state.modalsData.groupName);
    const dispatch = useDispatch();

    const [usersList, setUsersList] = useState([]);
    const [groupsMember, setGroupsMember] = useState([]);

    const [values, setValues] = useState({
        _id:"",
        username:"",
        email:"",
    })

    const user = useSelector(state => state.userData.user);
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
        const {_id, username,  email} = values;
        const {data} = await axios.post(addGroupsRoute, {
            _id,
            username,
            email,
            name: groupName,
            filter:"work"
        });
        console.log("Create a group")
        console.log(groupName);
        console.log("groupsMember",groupsMember);
        dispatch(setIsAddMembersModalOpen(false));
    }

    return <>
        {isAddMembersModalOpen && <ModalWindow>
            <ModalTitle title={'Add Members'}/>
            <SearchField></SearchField>
            <ul>
                {usersList.map((u) => (
                    <li key={u._id}{...u} onClick={() => {
                        setGroupsMember([...groupsMember, u])
                    }}>
                        <div>
                            <div>{u.avatarImage}</div>
                            {u.username && <div>{u.username}</div>}
                            <div>{u.email}</div>
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