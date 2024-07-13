import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit"
import supabase from "@/lib/supabase.ts"
import { Berita } from "@/pages/News.tsx"

export interface MainNewsRedux {
    loading: boolean;
    data: Berita[] | null;
    error: SerializedError | null;
}

const initialState: MainNewsRedux = {
    loading: false,
    data: null,
    error: null,
};

export const fetchMainNews = createAsyncThunk(
    'mainNews/fetchMainNews',
    async () => {
        const { data } = await supabase
            .from("news")
            .select(`id, title, description, short_description, date, type, image, site(id, name, logo)`)
            .order("date", { ascending: false })
            .limit(3)
        return data
    }
);

const paymenstsSlice = createSlice({
    name: 'mainNews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMainNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMainNews.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMainNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default paymenstsSlice.reducer;
