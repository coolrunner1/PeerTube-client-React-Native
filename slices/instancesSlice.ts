import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instancesSlice = createSlice({
    name: "instances",
    initialState: {
        currentInstance: ""
    },
    reducers: {
        setCurrentInstance: (state, action) => {
            AsyncStorage.setItem("instance", action.payload);
            state.currentInstance = action.payload;
        }
    }
});

export const {setCurrentInstance} = instancesSlice.actions;
export default instancesSlice.reducer;