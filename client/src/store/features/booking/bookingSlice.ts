import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import bookingService from "./bookingService"
import { Booking } from "../../../types"


const initialState = {
  booking: null as Booking | null,
  error: null as string | null,
  loading: false
}

export const getBookingById = createAsyncThunk('bookings/getById', async (id: string, thunkAPI) => {
  try {
    return await bookingService.getBookingByIdAsync(id)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookingById.pending, state => {
        state.loading = true
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false
        state.booking = action.payload
        state.error = null
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false
        state.booking = null
        state.error = action.payload as string | null
      })
  }
})


export default bookingSlice.reducer