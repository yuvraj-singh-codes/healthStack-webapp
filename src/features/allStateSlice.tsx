import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Benefit, Protocol } from '../Components/Interface/Interface';

interface AppState {
    benefit: Benefit[];
    protocol: Protocol[];
}

const initialState: AppState = {
    benefit: [],
    protocol: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setBenefit(state, action: PayloadAction<Benefit[]>) {
            state.benefit = action.payload;
        },
        setProtocol(state, action: PayloadAction<Protocol[]>) {
            state.protocol = action.payload;
        },
        resetState(state) {
            state.benefit = [];
            state.protocol = [];
        },
    },
});

export const { setBenefit, setProtocol, resetState } = appSlice.actions;

export default appSlice.reducer;
