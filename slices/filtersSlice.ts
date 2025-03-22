import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        selectedFilter: 0,
    },
    reducers: {
        setSelectedFilter: (state, action: PayloadAction<number>) => {
            state.selectedFilter = action.payload;
        }
    }
});

export const { setSelectedFilter } = filtersSlice.actions;
export default filtersSlice.reducer;