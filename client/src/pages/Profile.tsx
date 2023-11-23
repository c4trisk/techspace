import { useEffect } from 'react'
import BookingCard from "../components/BookingCard"
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useSelector } from 'react-redux'
import { getBoookings } from '../store/features/bookings/bookingsSlice'

const Profile = () => {

  const dispatch: AppDispatch = useDispatch()

  const { bookings, error, loading } = useSelector((state: RootState) => state.bookings)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(getBoookings())
  }, [user])

  const currentDate = new Date()

  // Separating current and previous bookings
  const currentBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date)
    return bookingDate >= currentDate
  }) 

  const previousBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date)
    return bookingDate < currentDate 
  })

  return (
    <div className="Profile">
      <h1 className="heading-1">Welcome to TechSpace!</h1>
      <section className="current-bookings">
        <div className="d-flex">
          <h2 className="heading-2">Current Bookings</h2>
          <p className="small">{currentBookings.length} {currentBookings.length === 1 ? 'Booking' : 'Bookings'}</p>
        </div>
        { error && <p>{error}</p> }
        { loading && <p>Loading...</p> }
        { currentBookings && currentBookings.map(booking => <BookingCard key={booking._id} booking={booking} style={'current'} />) }
      </section>

      {/* <section className="likes">
        <div className="d-flex">
          <h2 className="heading-2">Liked Venues</h2>
          <p className="small">0 Likes</p>
        </div>
        {
          
        }
      </section> */}

      <section className="previous-bookings">
        <div className="d-flex">
          <h2 className='heading-2'>Previous Bookings</h2>
          <p className="small">{previousBookings.length} {previousBookings.length === 1 ? 'Booking' : 'Bookings'}</p>
        </div>
        { previousBookings && previousBookings.map(booking => <BookingCard key={booking._id} booking={booking} style={'previous'} />) }
      </section>
    </div>
  )
}

export default Profile