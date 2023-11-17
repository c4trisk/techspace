import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import bookingsService from "./bookingsService"
import { Booking, NewBooking } from "../../../types"


const initialState = {
  bookings: [] as Booking[],
  error: null as string | null,
  loading: false
}

export const addBooking = createAsyncThunk('bookings/add', async (bookingData: NewBooking, thunkAPI) => {
  try {
    return await bookingsService.createBookingAsync(bookingData)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const getBoookings = createAsyncThunk('bookings/getAll', async (_, thunkAPI) => {
  try {
    return await bookingsService.getBookingsAsync()
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Booking
      .addCase(addBooking.pending, state => {
        state.loading = true
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = [...state.bookings, action.payload]
        state.error = null
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = false
        state.bookings = []
        state.error = action.payload as string | null
      })

      // Get bookings
      .addCase(getBoookings.pending, state => {
        state.loading = true
      })
      .addCase(getBoookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload
        state.error = null
      })
      .addCase(getBoookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  }
})

export default bookingsSlice.reducer