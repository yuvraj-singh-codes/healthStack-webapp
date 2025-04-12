import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Benefit, Protocol } from '../Components/Interface/Interface';

interface AppState {
    benefit: Benefit[];
    protocol: Protocol[];
    benefitLoading: boolean;
    protocolLoading: boolean;
    selectedSortValue: Record<string, boolean>;
    selectedFilters: Record<string, boolean>;
    isTourOpen: boolean;
}

const initialState: AppState = {
    benefit: [],
    protocol: [],
    benefitLoading: true,
    protocolLoading: true,
    selectedSortValue: {},
    selectedFilters: {},
    isTourOpen: false
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setBenefit(state, action: PayloadAction<Benefit[]>) {
            state.benefit = action.payload;
            state.benefitLoading = false;
        },
        setProtocol(state, action: PayloadAction<Protocol[]>) {
            state.protocol = action.payload;
            state.protocolLoading = false;
        },
        startBenefitLoading(state) {
            state.benefitLoading = true;
        },
        startProtocolLoading(state) {
            state.protocolLoading = true;
        },
        setSelectedSortValue(state, action: PayloadAction<Record<string, boolean>>) {
            state.selectedSortValue = action.payload;
        },
        setSelectedFilters(state, action: PayloadAction<Record<string, boolean>>) {
            state.selectedFilters = action.payload;
        },
        resetState(state) {
            state.benefit = [];
            state.protocol = [];
            state.benefitLoading = false;
            state.protocolLoading = false;
            state.selectedSortValue = {};
            state.selectedFilters = {};
        },
        setIsTourOpen(state, action: PayloadAction<boolean>) {
            state.isTourOpen = action.payload;
          }
    },
});

export const {
    setBenefit,
    setProtocol,
    startBenefitLoading,
    startProtocolLoading,
    setSelectedSortValue,
    setSelectedFilters,
    resetState,
    setIsTourOpen
} = appSlice.actions;

export default appSlice.reducer;
