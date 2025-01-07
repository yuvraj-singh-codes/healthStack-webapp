import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface CounterState {
  tab: number; // Number state
}

// Initial state
const initialState: CounterState = {
  tab: 0, // Default to 0
};

// Create the slice
const counterSlice = createSlice({
  name: 'tabvalue',
  initialState,
  reducers: {
    reset(state) {
      state.tab = 0; // Reset to 0
    },
    setValue(state, action: PayloadAction<number>) {
      state.tab = action.payload; // Set to a specific number
    },
  },
});

// Export the actions
export const {reset, setValue } = counterSlice.actions;

// Export the reducer
export default counterSlice.reducer;
