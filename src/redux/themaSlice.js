import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: 'light',
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, { payload }) {
            state.value = payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;