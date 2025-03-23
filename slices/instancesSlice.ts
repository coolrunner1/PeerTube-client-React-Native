import {createSlice} from "@reduxjs/toolkit";

const instancesSlice = createSlice({
    name: "instances",
    initialState: {
        currentInstance: "https://tinkerbetter.tube"
    },
    reducers: {

    }
});

export default instancesSlice.reducer;