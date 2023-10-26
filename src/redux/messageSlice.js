import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

const messagesSlice = createSlice({
    name: "messages", //імя слайсу
    initialState: initialState,//початковий стан редюсера слайсу
    //обєкт редюсерів
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload;
        }
    }
})

export const {setMessages} = messagesSlice.actions

export const messagesReducer = messagesSlice.reducer;