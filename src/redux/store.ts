import { configureStore } from '@reduxjs/toolkit';
import laporanReducer from './laporanSlice';

const store = configureStore({
    reducer: {
        laporan: laporanReducer,
        // Add other reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

