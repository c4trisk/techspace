import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import likesService from "./likesService"
import { Like } from "../../../types"

const initialState = {
  likedVenues: [] as Like[],
  error: null as string | null, 
  loading: false
}

export const addLike = createAsyncThunk('likes/add', async (venueId: string, thunkAPI) => {
  try {
    return await likesService.addLikeAsync(venueId)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const removeLike = createAsyncThunk('likes/remove', async (venueId: string, thunkAPI) => {
  try {
    return await likesService.removeLikeAsync(venueId)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const getLikes = createAsyncThunk('likes/getAll', async (_, thunkAPI) => {
  try {
    return await likesService.getLikesAsync()
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Like
      .addCase(addLike.pending, state => {
        state.loading = true
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false
        state.likedVenues = [...state.likedVenues, action.payload]
        state.error = null
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false
        state.likedVenues = []
        state.error = action.payload as string | null
      })

      // Remove Like
      .addCase(removeLike.pending, state => {
        state.loading = true
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        state.loading = false
        state.error = null

        const removedLikeId = action.payload?.removedLikeId
        state.likedVenues = state.likedVenues.filter(
          ((like: Like) => like.venue !== removedLikeId)
        )
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false
        state.likedVenues = []
        state.error = action.payload as string | null
      })

      // Get likes
      .addCase(getLikes.pending, state => {
        state.loading = true
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.loading = false
        state.likedVenues = action.payload
        state.error = null
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.loading = false
        state.likedVenues = []
        state.error = action.payload as string | null
      })
  }
})

export default likesSlice.reducer