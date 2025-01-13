import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    selectedSortValue: Record<string, boolean>;
    selectedFilters: Record<string, boolean>;
}

const initialState: FilterState = {
    selectedSortValue: {},
    selectedFilters: {},
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        initializeSortValue: (state, action: PayloadAction<string[]>) => {
            if (Object.keys(state.selectedSortValue).length === 0) {
                state.selectedSortValue = action.payload.reduce((acc, option) => {
                    acc[option] = false;
                    return acc;
                }, {} as Record<string, boolean>);
            }
        },
        initializeFilters: (state, action: PayloadAction<string[]>) => {
            if (Object.keys(state.selectedFilters).length === 0) {
                state.selectedFilters = action.payload.reduce((acc, option) => {
                    acc[option] = true;
                    return acc;
                }, {} as Record<string, boolean>);
            }
        },
        setSortValue: (state, action: PayloadAction<Record<string, boolean>>) => {
            state.selectedSortValue = { ...state.selectedSortValue, ...action.payload };
        },
        setFilters: (state, action: PayloadAction<Record<string, boolean>>) => {
            state.selectedFilters = { ...state.selectedFilters, ...action.payload };
        },
    },
});

export const { initializeSortValue, initializeFilters, setSortValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
