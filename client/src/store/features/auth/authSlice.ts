import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"
import { User } from "../../../types"


const initialState = {
  user: null,
  loading: false,
  error: null as string | null
}

export const login = createAsyncThunk('auth/login', async (payload: User, thunkAPI) => {
  try {
    return await authService.loginAsync(payload)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const signup = createAsyncThunk('auth/signup', async (payload: User, thunkAPI) => {
  try {
    return await authService.signupAsync(payload)
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = action.payload as string | null
      })
      // Signup
      .addCase(signup.pending, state => {
        state.loading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = action.payload as string | null
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer