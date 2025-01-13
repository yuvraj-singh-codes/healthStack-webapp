import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the filter state
interface FilterState {
  filterValue: Record<string, boolean>;
}

// Initial state for the filter
const initialState: FilterState = {
    filterValue: {},
};

// Create filter slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterValue: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.filterValue = action.payload;
    },
  },
});

// Export actions and reducer
export const { setFilterValue } = filterSlice.actions;
export default filterSlice.reducer;
