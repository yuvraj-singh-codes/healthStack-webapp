import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the sort state
interface SortState {
    sortValue: Record<string, boolean>;
}

// Initial state for the sort
const initialState: SortState = {
  sortValue: {},
};

// Create sort slice
const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortValue: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.sortValue = action.payload;
    },
  },
});

// Export actions and reducer
export const { setSortValue } = sortSlice.actions;
export default sortSlice.reducer;
