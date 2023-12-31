import ModalBackdrop from './ModalBackdrop/Backdrop';
import ModalWindow from "./ModalWindow/ModalWindow";
import ModalTitle from "./ModalTitle/ModalTitle";
import SearchField from "./SearchField/SearchField";
import {useState, useEffect} from "react";
import axios from "axios";
import {allUsersRoute} from "../utils/APIRoutes"
import {useDispatch, useSelector} from "react-redux";
import {setIsAllUsersModalListOpen} from "../redux/modalsSlice";
import AllUsersModalsItem from "./AllUsersModalsItem";
import {setAllUsersList} from "../redux/user/userSlice";

export default function AllUsersListModal() {
    const isAllUsersModalListOpen = useSelector(state => state.modalsData.isAllUsersModalListOpen);
    const user = useSelector(state => state.userData.user);
    const usersList = useSelector(state => state.userData.allUsersList)
    const {_id} = user // Призначаємо пустий об'єкт за замовчуванням, якщо curUser є undefined
    const dispatch = useDispatch();

    useEffect(() => {

        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${allUsersRoute}/${_id}`);
                const users = response.data;
               dispatch( setAllUsersList(users));

            } catch (error) {
                console.error(error)
            }
        }
        if (_id) {
            getAllUsers();
        }

    }, [_id]);




    const onCloseBtn = () => {
        dispatch(setIsAllUsersModalListOpen(false));
    }

    // console.log(usersList)

    return <>
        {isAllUsersModalListOpen &&
            (<ModalBackdrop>
            <ModalWindow>
                <ModalTitle title="Users"/>
                <SearchField/>
                <ul>
                    {usersList.map((u)=> (
                        <AllUsersModalsItem key={u._id} receiver={u}/>)
                    )
                }
                </ul>
                <button type="button" onClick={onCloseBtn}>Close</button>
            </ModalWindow>
        </ModalBackdrop>)}

    </>
}
