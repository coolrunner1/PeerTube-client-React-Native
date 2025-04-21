import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userPreferencesSlice = createSlice({
    name: "userPreferences",
    initialState: {
        preferredPlayer: "Native"
    },
    reducers: {
        setPreferredPlayer: (state, action) => {
            AsyncStorage.setItem("preferredPlayer", action.payload);
            state.preferredPlayer = action.payload;
        }
    }
});

export const {setPreferredPlayer} = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;