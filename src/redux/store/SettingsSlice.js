// store/settingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: { activeTab: "account" }, // Default to account tab
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = settingsSlice.actions;
export default settingsSlice.reducer;
