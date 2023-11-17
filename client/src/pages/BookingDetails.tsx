import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useParams } from 'react-router-dom'
import { getBookingById } from '../store/features/booking/bookingSlice'
import { formatDate } from '../helpers/formatDate'
import { FaBus, FaCar, FaMapPin, FaRegClock, FaConciergeBell, FaRegCalendarAlt, FaUser, FaTag, FaExpand, FaWifi, FaWheelchair, FaTv } from 'react-icons/fa'
import { FaTrain } from "react-icons/fa6";
import GoogleMaps from '../components/GoogleMaps'

const BookingDetails = () => {

  const dispatch: AppDispatch = useDispatch()

  const { id } = useParams()
  const { booking, error, loading } = useSelector((state: RootState) => state.booking)


  useEffect(() => {
    if(id) {
      dispatch(getBookingById(id))
    }
  }, [id, ])


  return (
    <div className="BookingDetails">
      { error && <p>{error}</p> }
      { loading && <p>Loading...</p> }
      { booking && <>
        <div className="d-flex">
          <h1 className="heading-1">Booking Number #{booking._id}</h1>
          <button className='btn-primary'>Add to calendar</button>
        </div>
        <h2 className="body">{formatDate(booking.date)} - {booking.startTime}:00 - {booking.endTime}:00</h2>

        <section className="venue">
          <div className="top">
            <div className="left">
              <p className="heading-2">{booking.venue.venueName}</p>
              <div className="icon-group">
                <FaMapPin className="icon" />
                <p className="small">{booking.venue.address}</p>
              </div>
              <div className="icon-group">
                <FaRegClock className="icon" />
                <p className="small">{booking.startTime}:00 - {booking.endTime}:00</p>
              </div>
              <div className="icon-group">
                <FaRegCalendarAlt className="icon" />
                <p className="small">{formatDate(booking.date)}</p>
              </div>
              <div className="icon-group">
                <FaUser className="icon" />
                <p className="small">{booking.attendees}</p>
              </div>
              <div className="icon-group">
                <FaTag className="icon" />
                <p className="small">SEK {booking.subTotal}</p>
              </div>
              <div className="icon-group">
                <FaConciergeBell className="icon" />
                <p className="small">{booking.cateringAdded ? 'Catering Added' : 'No Catering'}</p>
              </div>
            </div>
            <div className="right">
              <div className="img-l">
                <img src={booking.venue.images[0]} alt={booking.venue.venueName} />
              </div>
              <div className="smaller">
                <div className='img-s'>
                  <img src={booking.venue.images[1]} alt={booking.venue.venueName} />
                </div>
                <div className="img-s">
                  <img src={booking.venue.images[2]} alt={booking.venue.venueName} />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="amenities info-group">
                <div className="icon-column flex-column">
                  <FaExpand className='icon' />
                  <p className="heading-3">{booking.venue.squareMeters} &#13217;</p>
                </div>
                { booking.venue.amenities.wifi && <div className="icon-column flex-column">
                    <FaWifi className='icon' />
                    <p className='heading-3'>Wi-Fi</p>
                  </div>}
                  { booking.venue.amenities.accessibility && <div className="icon-column flex-column">
                    <FaWheelchair className='icon' />
                    <p className='heading-3'>Accessible</p>
                  </div>}
                  { booking.venue.amenities.screen && <div className="icon-column flex-column">
                    <FaTv className='icon' />
                    <p className='heading-3'>Screen</p>
                  </div>}
                  { booking.venue.amenities.catering && <div className="icon-column flex-column">
                    <FaConciergeBell className='icon' />
                    <p className='heading-3'>Catering</p>
                  </div>}
              </div>
              <div className="info-group">
                <h3 className="heading-2">Information</h3>
                <p className="small">Our venue is located so that it is accessible to all. We offer catering and many different type of aid so that your tech-event will run smoothly. There is always coffee, tea and water available.</p>
              </div>
              <div className="info-group">
                <h3 className="heading-2">Catering</h3>
                { booking.cateringAdded
                    ? <p className="small"><span className="heading-3">You have chosen catering for this booking.</span> You will be contacted by Catering Company within 2 days. If you are not contacted, let us know at catering@techspace.com</p>
                    : <p className="small"><span className="heading-3">You have not chosen catering for this booking.</span> If you would like to add catering at a later date, please contact us at catering@techspace.com and we will put you in touch with Catering Company.</p>
                }
              </div>
            </div>
            <div className="right">
              <div className="info-group">
                <h3 className="heading-2">Terms</h3>
                <p className="small">When it comes to cancellations, notify us at least 24 hours to avoid charges. After your meeting,  leave the room in a tidy state and dispose of any trash properly.
                                    We expect responsible usage and reporting of any damage. Please aim to start and finish your session as scheduled to avoid overtime charges. Make sure to keep your valuables attended. The number of attendees should not exceed the room's capacity. Kindly inform us in advance if you have specific accessibility requirements so we can make necessary accommodations. There is always staff on scene should you need us</p>
              </div>
              <div className="contact-card">
              <div className="one">
                  <h3 className="heading-2">{booking.venue.venueName}</h3>
                  <p className="small disabled">{booking.venue.address},</p>
                  <p className="small disabled">{booking.venue.location}</p>
                  <p className="link">{booking.venue.contactInformation.website}</p>
                </div>
                <div className="two">
                  <h3 className="heading-2">Contact Person</h3>
                  <p className="heading-3">{booking.venue.contactInformation.contactPerson.name}</p>
                  <p className="small disabled">{booking.venue.contactInformation.contactPerson.email}</p>
                  <p className="small disabled">{booking.venue.contactInformation.contactPerson.phone}</p>
                </div>
            </div>
            </div>
          </div>
        </section>

        <section className="location">
          <h2 className="heading-1">Venue Location</h2>
          <p className="body">{booking.venue.address}, {booking.venue.location}</p>
          <div className="top">
            <div className="image">
              <img src={booking.venue.images[0]} alt={booking.venue.venueName} />
            </div>
            <div className="directions">
              <h3 className="heading-2">Directions</h3>
              <div className="vehicles">
                <div className="vehicle-group">
                  <FaBus className="icon" />
                  <p className="heading-2">Jakobsgatan</p>
                  <p className="heading-2">Bus 1, 67, 73</p>
                  <p className="body">50 m</p>
                </div>
                <div className="vehicle-group">
                  <FaTrain className="icon" />
                  <p className="heading-2">T-Centralen</p>
                  <p className="heading-2">All lines</p>
                  <p className="body">500 m</p>
                </div>
                <div className="vehicle-group">
                  <FaCar className="icon" />
                  <p className="heading-2">P-Hus Sveavägen</p>
                  <p className="heading-2">Parking Hall</p>
                  <p className="body">250 m</p>
                </div>
              </div>
            </div>
          </div>
          <div className="maps">
            <GoogleMaps address={booking.venue.address} />
          </div>
        </section>

        <section className="billing">
          <h2 className="heading-1">Billing</h2>
          <h3 className="heading-2">Due Date {formatDate(booking.billingInformation.dueDate)}</h3>
          <div className="info-group">
            <h4 className="heading-2">Billing Address</h4>
            <p className="body">{booking.billingInformation.billingAddress.companyName}</p>
            <p className="body">{booking.billingInformation.billingAddress.address}</p>
          </div>
          <table className='price-table'>
            <tr>
              <th className='text-l'>Description</th>
              <th className='text-r'>Qty</th>
              <th className='text-r'>Unit</th>
              <th className='text-r'>Unit Price</th>
              <th className='text-r'>Vat 20%</th>
              <th className='text-r'>Total Price</th>
            </tr>
            <tr>
              <td className="text-l">Venue Rent</td>
              <td className="text-r">{booking.totalHours}</td>
              <td className="text-r">hours</td>
              <td className="text-r">SEK {(booking.billingInformation.pricing.pricePerHour).toFixed(2)}</td>
              <td className="text-r">SEK {((booking.billingInformation.pricing.pricePerHour * booking.totalHours) * 0.2).toFixed(2)}</td>
              <td className="text-r">SEK {(booking.subTotal + (booking.billingInformation.pricing.pricePerHour * .2)).toFixed(2)}</td>
            </tr>
            {
              booking.billingInformation.pricing.cleaningFee &&
              <tr>
                <td className="text-l">Cleaning Fee</td>
                <td className="text-r">1</td>
                <td className="text-r">pce</td>
                <td className="text-r">SEK {(booking.billingInformation.pricing.cleaningFee).toFixed(2)}</td>
                <td className="text-r">SEK {(booking.billingInformation.pricing.cleaningFee * 0.2).toFixed(2)}</td>
                <td className="text-r">SEK {(booking.billingInformation.pricing.cleaningFee + (booking.billingInformation.pricing.cleaningFee * 0.2)).toFixed(2)}</td>
              </tr>
            }
            <tr>
              <td className="text-l">Administration Fee</td>
              <td className="text-r">1</td>
              <td className="text-r">pce</td>
              <td className="text-r">SEK {(booking.billingInformation.pricing.adminFee).toFixed(2)}</td>
              <td className="text-r">SEK {(booking.billingInformation.pricing.adminFee * 0.2).toFixed(2)}</td>
              <td className="text-r">SEK {(booking.billingInformation.pricing.adminFee + (booking.billingInformation.pricing.adminFee * 0.2)).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='divider'></td>
              <td className='divider'></td>
              <td className='divider'></td>
              <td className='divider'></td>
              <td className='divider'></td>
              <td className='divider'></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-r'>Sub Total</td>
              <td className='text-r'>SEK {(booking.subTotal).toFixed(2)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-r'>Total VAT 20%</td>
              <td className='text-r'>SEK {(booking.subTotal * 0.2).toFixed(2)}</td>

            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className='text-r bold'>Total Amount Due</td>
              <td className='text-r bold'>SEK {(booking.subTotal + (booking.subTotal * 0.2)).toFixed(2)}</td>
            </tr>
          </table>
        </section>
        
      </>}
    </div>
  )
}

export default BookingDetails