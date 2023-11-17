import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store'
import { useSelector } from 'react-redux'
import { FaMapPin, FaRegClock, FaConciergeBell, FaRegCalendarAlt, FaUser, FaTag, FaExpand, FaWifi, FaWheelchair, FaTv } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addBooking } from '../store/features/bookings/bookingsSlice'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../helpers/formatDate'

const ConfirmBooking = () => {

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    attendees: 0,
    cateringAdded: false,
    date: '',
    startTime: '',
    endTime: '',
    totalHours: 0,
    subTotal: 0,
    slug: '',
    message: ''
  })

  const { venue, loading, error } = useSelector((state: RootState) => state.venue)

  useEffect(() => {
    const storedData = localStorage.getItem('bookingData')

    if(storedData) {
      const parsedData = JSON.parse(storedData)
      setFormData(parsedData)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(formData => {
      return {
        ...formData,
        [id]: value
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(venue) {
      const booking = {
        ...formData,
        venue: venue._id,
        billingInformation: {
          billingAddress: {
            companyName: 'Meikäläinen AB',
            address: 'Exempelgatan 32, 123 45 Stockholm'
          },
          pricing: {
            pricePerHour: venue.pricingInformation.pricePerHour,
            cleaningFee: venue.pricingInformation.cleaningFee,
            adminFee: venue.pricingInformation.adminFee
          }
        }
      }
      
      dispatch(addBooking(booking))
      navigate('/confirmation')
    }
  }


  return (
    <div className='ConfirmBooking'>
      { error && <p>{error}</p>}
      { loading && <p>Loading...</p> }
      { venue && 
      <>
        <h1 className="heading-1">Confirm Booking</h1>
        <div className="confirm-wrapper">
          <div className="venue-card">
            <div className="img-wrapper">
              <img src={venue.images[0]} alt={venue.venueName} />
            </div>
            <div className="p-2">
              <p className='heading-2'>{venue.venueName}</p>  
              <div className="icon-group">
                <FaMapPin className="icon" />
                <h2 className="small">{venue.address}, {venue.location}</h2>
              </div>
              <div className="icon-group">
                <FaRegClock className="icon" />
                <p className="small">{formData.startTime}.00 - {formData.endTime}.00</p>
              </div>
              <div className="icon-group">
                <FaRegCalendarAlt className="icon" />
                <p className="small">{formatDate(formData.date)}</p>
              </div>
              <div className="icon-group">
                <FaUser className="icon" />
                <p className="small">{formData.attendees}</p>
              </div>
              <div className="icon-group">
                <FaTag className="icon" />
                <p className="small">SEK {formData.subTotal},00</p>
              </div>
              <div className="icon-group">
                <FaConciergeBell className="icon" />
                <p className="small">{ formData.cateringAdded ? 'Catering Added' : 'No Catering' }</p>
              </div>
            </div>
              <div className="contact p-2">
                <h2 className="heading-2">Contact Person</h2>
                <p className="heading-3">{venue.contactInformation.contactPerson.name}</p>
                <p className="small disabled">{venue.contactInformation.contactPerson.email}</p>
                <p className="small disabled">{venue.contactInformation.contactPerson.phone}</p>
              </div>
          </div>
          <div className="info-card p-2">
            <div className="top">
              <div className="left">
                <div className="ameneties">
                  <div className="icon-group">
                    <FaExpand className='icon' />
                    <h3 className='heading-3'>{venue.squareMeters} &#13217;</h3>
                  </div>
                  { venue.amenities.wifi && <div className="icon-group">
                    <FaWifi className='icon' />
                    <h3 className='heading-3'>Wi-Fi</h3>
                  </div>}
                  { venue.amenities.accessibility && <div className="icon-group">
                    <FaWheelchair className='icon' />
                    <h3 className='heading-3'>Accessible</h3>
                  </div>}
                  { venue.amenities.screen && <div className="icon-group">
                    <FaTv className='icon' />
                    <h3 className='heading-3'>Screen</h3>
                  </div>}
                  { venue.amenities.catering && <div className="icon-group">
                    <FaConciergeBell className='icon' />
                    <h3 className='heading-3'>Catering</h3>
                  </div>}
                </div>
                <div className="grouping">
                  <h2 className="heading-2">Information</h2>
                  <p className='small'>Our venue is located so that it is accessible to all. We offer many different types of aid so that your tech-event will run smoothly. There is always coffee, tea and water available.</p>
                </div>
                <div className="grouping">
                  <h2 className="heading-2">Catering</h2>
                  { formData.cateringAdded
                    ? <p className="small"><span className="heading-3">You have chosen catering for this booking.</span> You will be contacted by Catering Company within 2 days. If you are not contacted, let us know at catering@techspace.com</p>
                    : <p className="small"><span className="heading-3">You have not chosen catering for this booking.</span> If you would like to add catering at a later date, please contact us at catering@techspace.com and we will put you in touch with Catering Company.</p>
                  }
                </div>
              </div>
              <div className="right">
                <div className="grouping">
                  <h2 className="heading-2">Terms</h2>
                  <p className='small'>When it comes to cancellations, notify us at least 24 hours to avoid charges. After your meeting,  leave the room in a tidy state and dispose of any trash properly.
                    We expect responsible usage and reporting of any damage. Please aim to start and finish your session as scheduled to avoid overtime charges. Make sure to keep your valuables attended. The number of attendees should not exceed the room's capacity. Kindly inform us in advance if you have specific accessibility requirements so we can make necessary accommodations. There is always staff on scene should you need us.</p>
                </div>
              </div>

            </div>
            <form className="bookingForm" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className='heading-2' htmlFor="message">Anything we need to know? Write it down below.</label>
                <textarea name="message" id="message" value={formData.message} onChange={handleChange}></textarea>
              </div>
              <div className="buttons">
                <button className="btn-secondary">Cancel</button>
                <button className='btn-primary' type="submit">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      </> }
    </div>
  )
}

export default ConfirmBooking