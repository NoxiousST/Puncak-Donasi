import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit"
import axios from 'axios';
import { EruptionInformation } from "@/lib/type.ts"

export interface MainAnalyticRedux {
    loading: boolean;
    data: EruptionInformation | null;
    error: SerializedError | null;
}

const initialState: MainAnalyticRedux = {
    loading: false,
    data: null,
    error: null,
};

export const fetchMainAnalytic = createAsyncThunk(
    'mAnalytic/fetchMainAnalytic',
    async () => {
        const response = await axios.get(`https://apipuncak.vercel.app/informasi-letusan?page=1`)
        return response.data.data[0] as EruptionInformation
    }
);

const mainAnalSlice = createSlice({
    name: 'mAnalytic',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMainAnalytic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMainAnalytic.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMainAnalytic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default mainAnalSlice.reducer;
