import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { useNavigate, useParams } from "react-router-dom"
import { getVenueBySlug } from '../store/features/venue/venueSlice'
import { FaHeart, FaRegHeart, FaExpand, FaWifi, FaWheelchair, FaTv, FaConciergeBell, FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { ImageCarousel } from '../components/ImageCarousel'
import iconBoardroom from '../assets/icon-boardroom.png'
import iconClassroom from '../assets/icon-classroom.png'
import iconDining from '../assets/icon-dining.png'
import iconStanding from '../assets/icon-standing.png'
import iconTheatre from '../assets/icon-theatre.png'
import iconUshape from '../assets/icon-ushape.png'
import { validateBookingForm } from '../helpers/validate'
import { formatPhone } from '../helpers/formatPhone'


const VenueDetails = () => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { slug } = useParams()
  const { venue, loading, error } = useSelector((state: RootState) => state.venue)

  const [showFormError, setShowFormError] = useState(false)
  const [isVenueLiked, setIsVenueLiked] = useState(false)
  const [showEquipmentList, setShowEquipmentList] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({
    date: '',
    attendees: '',
    startTime: '',
    endTime: '',
    cateringAdded: false,
  })


  useEffect(() => {
    if(slug) {
      dispatch(getVenueBySlug(slug))
    }
  }, [])


  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { name, value, type, checked } = e.target

    setSelectedOptions({
      ...selectedOptions,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const [startTime, endTime] = value.split('-')
    setSelectedOptions({
      ...selectedOptions, 
      startTime, 
      endTime 
    })
  }


  const calculateTotalHours = () => {
    const { startTime, endTime } = selectedOptions

    if(startTime && endTime) {
      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);
      return endHour - startHour;
    }

    return 0
  }

  
  
  const calculateSubTotal = () => {

    if(venue) {
      const pricePerHour = (totalHours * venue.pricingInformation.pricePerHour)
      const fees = venue.pricingInformation.cleaningFee 
        ? venue.pricingInformation.cleaningFee + venue.pricingInformation.adminFee
        : venue.pricingInformation.adminFee

      return pricePerHour + fees
    }

    return 0
  }

  const totalHours = calculateTotalHours()
  const subTotal = calculateSubTotal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(venue) {
      
      const formData = {
        ...selectedOptions,
        totalHours: totalHours,
        subTotal: subTotal,
        slug: venue.slug
      }

      const errors = validateBookingForm(formData, setShowFormError)
      if(errors) {
        return
      }
  
      localStorage.setItem('bookingData', JSON.stringify(formData))
      navigate('/confirm')
    }
  }

  return (
    <div className="VenueDetails">
      { loading && <p>Loading...</p> }
      { error && <p>{error}</p> }
      { venue && (
        <>
          <div className="d-flex">
          <div className='name'>
            <h1 className='heading-1'>{venue.venueName}</h1>
            <h2 className='small'>{venue.address}, {venue.location}</h2>
          </div>
          {/* <div className="d-flex like" >
            <p className="small">{isVenueLiked ? 'Liked' : 'Like'}</p>
            {
              isVenueLiked
              ? <FaHeart />
              : <FaRegHeart />
            }
            
          </div> */}
          </div>
          <ImageCarousel venue={venue} />
          <div className="main">
            <div className="left">
              <div className="grouping">
                <h2 className='heading-2'>Information</h2>
                <p className='body'>{venue.description}</p>
              </div>
              <div className="grouping">
                <h2 className="heading-2">Ameneties</h2>
                <div className="icons">
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
                {
                  venue.amenities.catering 
                  ? <p className="body">Our venue is located so that it is accessible to all. We offer catering and many different type of aid so that your tech event will run smoothly. There is always coffee, tea and water available.</p>
                  : <p className="body">Our venue is located so that it is accessible to all. We offer many different type of aid so that your tech event will run smoothly. There is always coffee, tea and water available.</p>
                }
                <div className="list cursor-pointer" onClick={() => setShowEquipmentList(state => !state)}>
                  <h4 className="link">List of technical equipment</h4>
                  {showEquipmentList ? <FaChevronDown className="chevron" /> : <FaChevronRight className="chevron" />}
                </div>
                {
                  showEquipmentList && 
                  <div className="equipment-list">
                    { venue.technicalEquipment.map(item => (
                      <div key={item._id}>
                        <h5 className='heading-3'>{item.title}</h5>
                        <p className="small">{item.description}</p>
                      </div>
                    )) }
                  </div>
                }
              </div>
              <div className="grouping">
                <h2 className="heading-2">Arrangements</h2>
                <div className='furniture-arrangements'>
                  { venue.furnitureArrangements.standing && <div className="flex-column">
                    <img className='room-icon' src={iconStanding} alt="Standing" />
                    <p className='small'>Standing</p>
                    <p className="heading-2">{venue.furnitureArrangements.standing}</p>
                  </div>}
                  { venue.furnitureArrangements.boardroom && <div className="flex-column">
                    <img className='room-icon' src={iconBoardroom} alt="Boardroom" />
                    <p className='small'>Boardroom</p>
                    <p className="heading-2">{venue.furnitureArrangements.boardroom}</p>
                  </div>}
                  { venue.furnitureArrangements.classroom && <div className="flex-column">
                    <img className='room-icon' src={iconClassroom} alt="Classroom" />
                    <p className='small'>Classroom</p>
                    <p className="heading-2">{venue.furnitureArrangements.classroom}</p>
                  </div>}
                  { venue.furnitureArrangements.theatre && <div className="flex-column">
                    <img className='room-icon' src={iconTheatre} alt="Theatre" />
                    <p className='small'>Theatre</p>
                    <p className="heading-2">{venue.furnitureArrangements.theatre}</p>
                  </div>}
                  { venue.furnitureArrangements.uShape && <div className="flex-column">
                    <img className='room-icon' src={iconUshape} alt="U-shape" />
                    <p className='small'>U-shape</p>
                    <p className="heading-2">{venue.furnitureArrangements.uShape}</p>
                  </div>}
                  { venue.furnitureArrangements.dining && <div className="flex-column">
                    <img className='room-icon' src={iconDining} alt="Dining" />
                    <p className='small'>Dining</p>
                    <p className="heading-2">{venue.furnitureArrangements.dining}</p>
                  </div>}
                </div>
              </div>
              <div className="grouping">
                <h2 className="heading-2">Venue Contact</h2>
                <p className="body">Do you have questions about this locale or its equipment? Please contact the venue directly.</p>
              </div>
            </div>

            <div className="right">
              <form className="bookingForm" onSubmit={handleSubmit}>
                <h2 className='heading-1'>Book This Venue</h2>
                <p className='small'>From SEK {(venue.pricingInformation.pricePerHour).toFixed(2)}/hour</p>
                <div className="input-group">
                  <label htmlFor="date">Date</label>
                  <input type="date" name="date" id="date" value={selectedOptions.date} onChange={handleOptionChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="attendees">Attendees</label>
                  <input type='number' name="attendees" id="attendees" value={selectedOptions.attendees} onChange={handleOptionChange} />
                </div>
                <div className="input-group">
                  <label htmlFor="time">Time</label>
                  <select name="time" id="time" value={`${selectedOptions.startTime}-${selectedOptions.endTime}`} onChange={handleTimeChange}>
                    <option value="placeholder">Select Time</option>
                    <option value="8-22">Whole Day: 08:00 - 22:00</option>
                    <option value="8-12">Morning: 08:00 - 12:00</option>
                    <option value="12-17">Afternoon: 12:00 - 17:00</option>
                    <option value="17-22">Evening: 17:00 - 22:00</option>
                  </select>
                </div>
                
                { showFormError && <p className='error heading-2'>You need to fill in all booking fields.</p> }

                <div className="checkbox-group">
                  <input type="checkbox" name="cateringAdded" id="cateringAdded" checked={selectedOptions.cateringAdded} onChange={handleOptionChange} />
                  <label htmlFor="cateringAdded">Add Catering to Booking</label>
                </div>

                <div className="pricing">
                  <div className="d-flex">
                    <p className="small disabled">SEK {venue.pricingInformation.pricePerHour} x {totalHours} hours</p>
                    <p className="heading-3 disabled">SEK {(venue.pricingInformation.pricePerHour * totalHours).toFixed(2)}</p>
                  </div>
                  { venue.pricingInformation.cleaningFee && <div className="d-flex">
                    <p className="small disabled">Cleaning Fee</p>
                    <p className="heading-3 disabled">SEK {(venue.pricingInformation.cleaningFee).toFixed(2)}</p>
                  </div>}
                  <div className="d-flex">
                    <p className="small disabled">Admin Fee</p>
                    <p className="heading-3 disabled">SEK {(venue.pricingInformation.adminFee).toFixed(2)}</p>
                  </div>
                  <div className="d-flex">
                    <p className="heading-2">Total Amount</p>
                    <p className="heading-2">SEK {(subTotal).toFixed(2)}</p>
                  </div>
                </div>

                <button className="btn-primary">Book now</button>
                <p className="small disabled">Confirmation and Payment Options to follow.</p>
                <p className="small disabled"><span className="link">Terms & Conditions</span> apply</p>
              </form>
              <div className="contact-info">
                <div className="left">
                  <h3 className="heading-2">{venue.venueName}</h3>
                  <p className="small disabled">{venue.address},</p>
                  <p className="small disabled">{venue.location}</p>
                  <p className="link">{venue.contactInformation.website}</p>
                </div>
                <div className="right">
                  <h3 className="heading-2">Contact Person</h3>
                  <p className="heading-3">{venue.contactInformation.contactPerson.name}</p>
                  <p className="small disabled">{venue.contactInformation.contactPerson.email}</p>
                  <p className="small disabled">{formatPhone(venue.contactInformation.contactPerson.phone)}</p>
                </div>
              </div>

            </div>     
          </div>
          {/* <h2 className="heading-2">Other Venues You Might Like</h2> */}
        </>
      )}
    </div>
  )
}

export default VenueDetails