import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your array items
interface Item {
  id: number;
  name: string;
}

// Define the state type
interface ItemsState {
  items: Item[];
}

// Initial state
const initialState: ItemsState = {
  items: [], // Array state
};

// Create the slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload); // Add an item to the array
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload); // Remove item by ID
    },
    clearItems(state) {
      state.items = []; // Clear the array
    },
  },
});

// Export the actions
export const { addItem, removeItem, clearItems } = itemsSlice.actions;

// Export the reducer
export default itemsSlice.reducer;
