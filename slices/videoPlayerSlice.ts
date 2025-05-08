import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const videoPlayerSlice = createSlice({
    name: "videoPlayer",
    initialState: {
        currentVideo: ""
    },
    reducers: {
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload;
        }
    }
});

export const {setCurrentVideo} = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;