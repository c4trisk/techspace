import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import venueService from "./venueService"
import { Venue } from "../../../types"


const initialState = {
  venue: null as Venue | null,
  error: null as string | null,
  loading: false
}

export const getVenueBySlug = createAsyncThunk('venues/getBySlug', async (payload: string, thunkAPI) => {
  try {
    return await venueService.getVenueAsync(payload)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})


export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVenueBySlug.pending, state => {
        state.loading = true
      })
      .addCase(getVenueBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.venue = action.payload
        state.error = null
      })
      .addCase(getVenueBySlug.rejected, (state, action) => {
        state.loading = false
        state.venue = null
        state.error = action.payload as string | null
      })
  }
})

export default venueSlice.reducer
