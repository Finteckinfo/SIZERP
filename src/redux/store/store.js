import { configureStore } from "@reduxjs/toolkit"
import settingsReducer from "./SettingsSlice";
import darkModeReducer from "./DarkModeSlice";


export const store = configureStore({

    reducer:{
        settings: settingsReducer,
        darkMode: darkModeReducer,
    }

});
