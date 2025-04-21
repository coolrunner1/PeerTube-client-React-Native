import {configureStore} from "@reduxjs/toolkit";
import filtersSlice from "@/slices/filtersSlice";
import instancesSlice from "@/slices/instancesSlice";
import userPreferencesSlice from "@/slices/userPreferencesSlice";

export const store = configureStore({
    reducer: {
        filters: filtersSlice,
        instances: instancesSlice,
        userPreferences: userPreferencesSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>