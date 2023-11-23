import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import venuesService from './venuesService'


const initialState = {
  venues: [],
  error: null as string | null,
  loading: false
}


export const getAllVenues = createAsyncThunk('venues/getAll', async (_, thunkAPI) => {
  try {
    return await venuesService.getAllVenuesAsync()
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const getFilteredVenues = createAsyncThunk('venues/getFiltered', async (filters: Record<string, string>, thunkAPI) => {
  try {
    return await venuesService.getFilteredVenuesAsync(filters)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})


export const venuesSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    updateVenues(state, action) {
      state.venues = action.payload
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenues.pending, state => {
        state.loading = true
      })
      .addCase(getAllVenues.fulfilled, (state, action) => {
        state.loading = false
        state.venues = action.payload
        state.error = null
      })
      .addCase(getAllVenues.rejected, (state, action) => {
        state.loading = false
        state.venues = []
        state.error = action.payload as string | null
      })


      .addCase(getFilteredVenues.pending, state => {
        state.loading = true
      })
      .addCase(getFilteredVenues.fulfilled, (state, action) => {
        state.loading = false
        state.venues = action.payload
        state.error = null
      })
      .addCase(getFilteredVenues.rejected, (state, action) => {
        state.loading = false
        state.venues = []
        state.error = action.payload as string | null
      })
  }
})

export const { updateVenues } = venuesSlice.actions

export default venuesSlice.reducer