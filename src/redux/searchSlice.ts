import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit"
import axios from 'axios';
import { Payment } from "@/lib/type.ts"

export interface SearchRedux {
    loading: boolean;
    data: Payment | null;
    error: SerializedError | null;
}

const initialState: SearchRedux = {
    loading: false,
    data: null,
    error: null,
};

export const fetchPayments = createAsyncThunk(
    'payments/fetchPayments',
    async () => {
        const response = await axios.get(`https://apipuncak.vercel.app/payments`)
        return response.data.paymentList as Payment;
    }
);

const paymenstsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default paymenstsSlice.reducer;
