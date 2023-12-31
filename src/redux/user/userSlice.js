import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {username: null, email: null, _id:"", isAvatarImageSet:false},
    token: null,
    isLoggedIn: false,
    errorLoginMessage: null,
    errorRegisterMessage: null,
    allUsersList:[],
}

const userSlice = createSlice({
    name: "user", //імя слайсу
    initialState: initialState,//початковий стан редюсера слайсу
    //обєкт редюсерів
    reducers: {
        setCurrentUser(state, action) {
            state.user = action.payload;
        },
        setAllUsersList(state, action) {
            state.allUsersList = action.payload;
        }
    }
})

export const {setCurrentUser, setAllUsersList} = userSlice.actions;

export const userReducer = userSlice.reducer;