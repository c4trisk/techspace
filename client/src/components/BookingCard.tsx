import { Link } from 'react-router-dom'
import { Booking } from '../types'
import { formatDate } from '../helpers/formatDate'

interface BookingCardProps {
  booking?: Booking
  style: string
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, style }) => {

  // Breaks site of not present...
  if (!booking || !booking._id ||!booking.venue || !booking.venue.images) return null

  return (
    <Link to={`/booking/${booking._id}`} className={'BookingCard ' + style}>
      <div className="left">
        <div>
          <h3 className="small mb-1">Booking Number #{booking._id}</h3>
          <div className="d-flex mb-1">
            <p className="heading-2">{booking.venue.venueName}</p>
            <p className="heading-2">{formatDate(booking.date)}</p>
          </div>
          <div className="d-flex">
            <p className="body">{booking.venue.address}</p>
            <p className="heading-2">{booking.startTime}:00 - {booking.endTime }:00</p>
          </div>
        </div>
        <p className="heading-2 price">SEK {(booking.subTotal).toFixed(2)}</p>
      </div>
      <div className="right">
        <img src={booking.venue.images[0]} alt={booking.venue.venueName} />
      </div>
    </Link>
  )
}

export default BookingCard