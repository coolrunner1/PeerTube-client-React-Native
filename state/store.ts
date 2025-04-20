import {configureStore} from "@reduxjs/toolkit";
import filtersSlice from "@/slices/filtersSlice";
import instancesSlice, {setCurrentInstance} from "@/slices/instancesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = configureStore({
    reducer: {
        filters: filtersSlice,
        instances: instancesSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>