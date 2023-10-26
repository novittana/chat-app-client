import ModalBackdrop from './ModalBackdrop/Backdrop';
import ModalWindow from "./ModalWindow/ModalWindow";
import ModalTitle from "./ModalTitle/ModalTitle";
import SearchField from "./SearchField/SearchField";
import NewContactForm from "./NewContactForm/NewContactForm";
import styled from "styled-components";
import {useState} from "react";
import ContactList from "./ContactList/ContactList";
import {useDispatch, useSelector} from "react-redux";
import {setIsNewGroupModalOpen, setIsContactsModalOpen, setIsAllUsersModalListOpen, setIsContactModal} from "../redux/modalsSlice";

export default function ContactModal() {
    const user = useSelector(state => state.userData.user);
    const isContactsModalOpen = useSelector(state => state.modalsData.isContactsModalOpen);
    const isContactModal = useSelector(state => state.modalsData.isContactModal);
    const dispatch = useDispatch();
    // const [isContactModal, setIsContactModal] = useState(false);

    const closeModalContacts = ()=>{
       dispatch(setIsContactsModalOpen(false))
    }
    const onAddContactBtn = () =>{
        dispatch(setIsContactsModalOpen(false));
        dispatch(setIsContactModal(true))
    }

    const closeModalContact = () =>{
        dispatch(setIsContactModal(false))
    }



    return <>
        {isContactsModalOpen && <ModalBackdrop>
            <ModalWindow>
                <ModalTitle title="Contacts"/>
                <SearchField/>
               <ContactList currentUser={user}/>
                <button type="button" onClick={onAddContactBtn}>Add Contact</button>
                <button type="button" onClick={closeModalContacts}>Close</button>
            </ModalWindow>
        </ModalBackdrop>}
        {isContactModal && (<ContactModalContainer>
            <ModalBackdrop>
                <ModalWindow>
                    <ModalTitle title="New Contact"/>
                    <NewContactForm currentUser={user} setContactModal={setIsContactModal} setIsContactsModalOpen={setIsContactsModalOpen}></NewContactForm>
                    <button type="button" onClick={closeModalContact}>Cancel</button>
                </ModalWindow>
            </ModalBackdrop>
        </ContactModalContainer>)}

    </>
}

const ContactModalContainer = styled.div`
`;