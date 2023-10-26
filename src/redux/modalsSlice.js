import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isContactModal:false,
    isNewGroupModalOpen: false,
    isContactsModalOpen: false,
    isAllUsersModalListOpen: false,
    isAddMembersModalOpen:false,
    groupName:"",
}

const modalsSlice = createSlice({
    name: "modals", //імя слайсу
    initialState: initialState,//початковий стан редюсера слайсу
    //обєкт редюсерів
    reducers: {
        setIsNewGroupModalOpen(state, action) {
            state.isNewGroupModalOpen = action.payload;
        },
        setIsContactsModalOpen(state, action) {
            state.isContactsModalOpen = action.payload;
        },
        setIsAllUsersModalListOpen(state, action) {
            state.isAllUsersModalListOpen = action.payload;
        },
        setIsContactModal(state, action) {
            state.isContactModal = action.payload;
        },
        setIsAddMembersModalOpen(state, action) {
            state.isAddMembersModalOpen = action.payload;
        },
        setGroupName(state, action) {
            state.groupName = action.payload;
        },
    }
})

export const {setIsNewGroupModalOpen, setIsContactsModalOpen, setIsAllUsersModalListOpen, setIsContactModal,setIsAddMembersModalOpen,setGroupName } = modalsSlice.actions

export const modalsReducer = modalsSlice.reducer;