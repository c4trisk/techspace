import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import venuesSlice from "./features/venues/venuesSlice";
import venueSlice from "./features/venue/venueSlice";
import bookingsSlice from "./features/bookings/bookingsSlice";
import bookingSlice from "./features/booking/bookingSlice";
import likesSlice from "./features/likes/likesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    venue: venueSlice,
    venues: venuesSlice,
    booking: bookingSlice,
    bookings: bookingsSlice,
    likes: likesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch