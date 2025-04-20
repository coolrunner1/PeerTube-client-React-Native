import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        selectedCategory: 0,
    },
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload;
        }
    }
});

export const { setSelectedCategory } = filtersSlice.actions;
export default filtersSlice.reducer;