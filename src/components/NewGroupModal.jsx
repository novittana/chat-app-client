import ModalBackdrop from './ModalBackdrop/Backdrop';
import ModalWindow from "./ModalWindow/ModalWindow";
import ModalTitle from "./ModalTitle/ModalTitle";
import ModalAddGroupName from "./AddGroup/ModalAddGroupName";
import {useState} from "react";
import css from "./AddGroup/ModalAddGroupName.module.css";
import AddGroupMembers from "./AddGroupMembers";
import {useDispatch, useSelector} from "react-redux";
import {setIsNewGroupModalOpen, setIsAddMembersModalOpen, setGroupName} from "../redux/modalsSlice"

export default function NewGroupModal() {
    // const [groupName, setGroupName] = useState("");
    const isNewGroupModalOpen = useSelector(state => state.modalsData.isNewGroupModalOpen);
    const isAddMembersModalOpen = useSelector(state => state.modalsData.isAddMembersModalOpen);
    const groupName = useSelector(state => state.modalsData.groupName);
    const dispatch = useDispatch();



    return <>
        {isNewGroupModalOpen && (<ModalBackdrop>
            <ModalWindow>
                <ModalTitle title="New Group"></ModalTitle>
                <ModalAddGroupName groupName={groupName} setGroupName={setGroupName} setIsNewGroupModalOpen={setIsNewGroupModalOpen}></ModalAddGroupName>
            </ModalWindow>
        </ModalBackdrop>)}
        {isAddMembersModalOpen && <AddGroupMembers/>}
    </>
}