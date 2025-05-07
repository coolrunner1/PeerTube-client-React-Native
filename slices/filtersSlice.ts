import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        selectedCategory: 0,
        selectedSepiaCategory: 0
    },
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload;
        },
        setSelectedSepiaCategory: (state, action: PayloadAction<number>) => {
            state.selectedSepiaCategory = action.payload;
        }
    }
});

export const { setSelectedCategory, setSelectedSepiaCategory } = filtersSlice.actions;
export default filtersSlice.reducer;