import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: '',
};
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter(state, { payload }) {
            state.value = payload;
        },
    },
});

export const { addFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;