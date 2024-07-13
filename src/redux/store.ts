import { configureStore } from '@reduxjs/toolkit';
import laporanReducer from './laporanSlice';
import paymentReducer from './searchSlice.ts';
import mAnalyticReducer from './mainAnalyticSlice.ts';
import mNewsReducer from './mainNewsSlice.ts';

const store = configureStore({
    reducer: {
        laporan: laporanReducer,
        payments: paymentReducer,
        mainAnalytic: mAnalyticReducer,
        mainNews: mNewsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

