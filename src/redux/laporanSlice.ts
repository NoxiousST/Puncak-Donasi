import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit"
import axios from 'axios';
import { ResponseActivity } from "@/lib/type.ts"
import { SERVER } from "@/lib/utils.ts"

interface MapRedux {
    loading: boolean;
    data: ResponseActivity[] | null;
    error: SerializedError | null;
}

const initialState: MapRedux = {
    loading: false,
    data: null,
    error: null,
};

export const fetchLaporan = createAsyncThunk(
    'laporan/fetchLaporan',
    async () => {
        const response = await axios.get(`${SERVER}/mapbox`);
        return response.data.aktivitas as ResponseActivity[];
    }
);

const laporanSlice = createSlice({
    name: 'laporan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLaporan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLaporan.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLaporan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default laporanSlice.reducer;
