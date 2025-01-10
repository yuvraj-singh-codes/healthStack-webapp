// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Benefit, Protocol } from '../Components/Interface/Interface';

// interface AppState {
//     benefit: Benefit[];
//     protocol: Protocol[];
// }

// const initialState: AppState = {
//     benefit: [],
//     protocol: [],
// };

// const appSlice = createSlice({
//     name: 'app',
//     initialState,
//     reducers: {
//         setBenefit(state, action: PayloadAction<Benefit[]>) {
//             state.benefit = action.payload;
//         },
//         setProtocol(state, action: PayloadAction<Protocol[]>) {
//             state.protocol = action.payload;
//         },
//         resetState(state) {
//             state.benefit = [];
//             state.protocol = [];
//         },
//     },
// });

// export const { setBenefit, setProtocol, resetState } = appSlice.actions;

// export default appSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Benefit, Protocol } from '../Components/Interface/Interface';

interface AppState {
    benefit: Benefit[];
    protocol: Protocol[];
    benefitLoading: boolean;
    protocolLoading: boolean;
}

const initialState: AppState = {
    benefit: [],
    protocol: [],
    benefitLoading: true,
    protocolLoading: true,
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
        resetState(state) {
            state.benefit = [];
            state.protocol = [];
            state.benefitLoading = false;
            state.protocolLoading = false;
        },
    },
});

export const {
    setBenefit,
    setProtocol,
    startBenefitLoading,
    startProtocolLoading,
    resetState,
} = appSlice.actions;

export default appSlice.reducer;
