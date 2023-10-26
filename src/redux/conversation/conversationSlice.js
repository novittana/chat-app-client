import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
    currentConversation: {},
    currentConversationsOpen: false,
    currentConversationUser: {},
    currentReceiverId: null,
    currentConversationList: []
}

const conversationSlice = createSlice({
    name: "conversation", //імя слайсу
    initialState: initialState,//початковий стан редюсера слайсу
    //обєкт редюсерів
    reducers: {
        setConversations(state, action) {
            state.conversations = action.payload;
        },
        setCurrentConversation(state, action) {
            state.currentConversation = action.payload;
        },
        setCurrentConversationOpen(state, action) {
            state.currentConversationOpen = action.payload;
        },
        setCurrentConversationUser(state, action) {
            state.currentConversationUser = action.payload;
        },
        setCurrentReceiverId(state, action) {
            state.currentReceiverId = action.payload;
        },
        setCurrentConversationList(state, action) {
            state.currentConversationList = action.payload;
        },
    }
})

export const {
    setConversations,
    setCurrentConversation,
    setCurrentConversationOpen,
    setCurrentConversationUser,
    setCurrentReceiverId,
    setCurrentConversationList
} = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;