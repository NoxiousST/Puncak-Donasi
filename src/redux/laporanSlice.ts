import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Mount {
    name: string;
    status: string;
    location: string;
    latitude: number;
    longitude: number;
    link: string;
    laporan: {
        image: string;
        visual: string;
        gempa: string;
        rekomendasi: string;
    };
}

interface AktivitasResponse {
    status: string;
    description: string;
    count: number;
    mounts: Mount[];
}

interface AktivitasState {
    loading: boolean;
    data: AktivitasResponse[] | null;
    error: string | null;
}

const initialState: AktivitasState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchLaporan = createAsyncThunk(
    'laporan/fetchLaporan',
    async () => {
        const response = await axios.get("http://localhost:3000/mapbox");
        return response.data.aktivitas as AktivitasResponse[];
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
                state.error = action.error.message || 'Failed to fetch laporan';
            });
    },
});

export default laporanSlice.reducer;
