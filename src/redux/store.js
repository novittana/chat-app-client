import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./user/userSlice";
import {conversationReducer} from "./conversation/conversationSlice";
import {messagesReducer} from "./messageSlice";
import {modalsReducer} from "./modalsSlice"
import {filterReducer} from "./filterSlice";
import {themeReducer} from "./themaSlice";

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';

export const store = configureStore({
    reducer: {
        userData: userReducer,
        conversationData: conversationReducer,
        messagesData: messagesReducer,
        modalsData: modalsReducer,
        filterData: filterReducer,
        themeData:themeReducer,
    }
})