import { createSlice } from '@reduxjs/toolkit';

// Initialize state from localStorage if available
const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' || false,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      // Save to localStorage
      localStorage.setItem('darkMode', state.darkMode);
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export const selectDarkMode = (state) => state.darkMode.darkMode;
export default darkModeSlice.reducer;
