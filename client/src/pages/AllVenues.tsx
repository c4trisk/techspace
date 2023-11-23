import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { getAllVenues } from '../store/features/venues/venuesSlice'
import VenueCard from '../components/VenueCard'
import { Filters, Venue } from '../types'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { LuSettings2 } from 'react-icons/lu'

const AllVenues = () => {

  const dispatch: AppDispatch = useDispatch()
  const { venues, error, loading } = useSelector((state: RootState) => state.venues)
  const [showOptions, setShowOptions] = useState(false)

  const [filteredVenues, setFilteredVenues] = useState([])
  const [filters, setFilters] = useState<Filters>({
    date: '',
    location: '',
    attendees: '',
    price: '',
    catering: '',
    breakoutRooms: '',
  })


  useEffect(() => {
    dispatch(getAllVenues())
  }, [])

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Filtering venues
    const [minPrice, maxPrice] = filters.price.split('-').map(Number)
    const [minCapacity, maxCapacity] = filters.attendees.split('-').map(Number)

    const tempFilteredVenues = venues.filter((venue: Venue) => {
      const locationMatch = !filters.location || venue.location === filters.location
      
      const priceMatch = !filters.price || (
        venue.pricingInformation.pricePerHour >= minPrice &&
        venue.pricingInformation.pricePerHour <= maxPrice
      )      
      
      const capacityMatch = !filters.attendees || (
        venue.capacity >= minCapacity && 
        venue.capacity <= maxCapacity
      )

      const cateringMatch = filters.catering ? venue.amenities.catering : true
      
      const breakoutRoomsMatch = filters.breakoutRooms ? venue.amenities.breakoutRooms : true

      return (
        (!filters.location || locationMatch) &&
        (!filters.price || priceMatch) &&
        (!filters.attendees || capacityMatch) &&
        (!filters.catering || cateringMatch) &&
        (!filters.breakoutRooms || breakoutRoomsMatch)
      )
    })

    setFilteredVenues(tempFilteredVenues);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    
    const { name, value, type } = e.target;
    let updatedValue: string | boolean = value;

    if (type === "checkbox") {
      updatedValue = (e.target as HTMLInputElement).checked;
    }

    setFilters((prevFilters) => ({ ...prevFilters, [name]: updatedValue }));
  }

  return (
    <div className="AllVenues">
      
      <div className='SearchBar'>
      <h1 className='heading-3'>What Kind of Venue Are You Looking For?</h1>
      <form onSubmit={handleSubmit} className="searchForm">
        <div className="inputs">
          <div className="input-group">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date"  value={filters.date} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <select name="location" id="location" value={filters.location} onChange={handleChange}>
              <option value="placeholder">Select Location</option>
              <option value="Kungsholmen">Kungsholmen</option>
              <option value="Liljeholmen">Liljeholmen</option>
              <option value="Norrmalm">Norrmalm</option>
              <option value="Södermalm">Södermalm</option>
              <option value="Vasastan">Vasastan</option>
              <option value="Östermalm">Östermalm</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="attendees">Attendees</label>
            <select name="attendees" id="attendees"  value={filters.attendees} onChange={handleChange}>
              <option value="placeholder">Select Quantity</option>
              <option value="0-10">10 attendees or less</option>
              <option value="11-40">11 - 40 attendees</option>
              <option value="41-100">41 - 100 attendees</option>
              <option value="101-9999">101 attendees or more</option>
            </select>
          </div>
          <div className="input-group">
          <label htmlFor="price">Price</label>
            <select name="price" id="price"  value={filters.price} onChange={handleChange}>
              <option value="placeholder">Select Price Range</option>
              <option value="0-400">0 - 400 SEK/h</option>
              <option value="401-800">400 - 800 SEK/h</option>
              <option value="801-1200">800 - 1 200 SEK/h</option>
              <option value="1201-1500">1 200 - 1 500 SEK/h</option>
              <option value="1501-9999">1 501 SEK/h or more</option>
            </select>
          </div>
        </div>
        
        <div className="d-flex">
          <div className="d-flex cursor-pointer" onClick={() => setShowOptions(state => !state)}>
            <p className='heading-3'>More Options </p>  
            {
              showOptions 
              ? <FaChevronDown className="icon" />
              : <FaChevronRight className="icon" />
            }
            
          </div>
          <button className="btn-primary">Search</button>
        </div>
        { showOptions &&
          <div className="options">
          <div className="checkbox-group">
            <input type="checkbox" name="catering" id="catering" value={filters.catering} onChange={handleChange} />
            <label className='small' htmlFor="catering">Offers Catering</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="breakoutRooms" id="breakoutRooms"  value={filters.breakoutRooms} onChange={handleChange} />
            <label className='small' htmlFor="breakoutRooms">Breakout Rooms</label>
          </div>
        </div>}
      </form>
    </div>

      <div className="d-flex">
        <h2 className="heading-2">All Venues</h2>
        <div className="d-flex">
          <LuSettings2 className="icon" />
          <p className="small">Popularity</p>
        </div>
      </div>
      <div className="venues">
        { error && <p>{error}</p> }
        { loading && <p>Loading...</p> }
        { filteredVenues.length > 0 ? (
          filteredVenues.map((venue: Venue) => <VenueCard key={venue._id} venue={venue} />)
          ) : (
            venues.map((venue: Venue) => <VenueCard key={venue._id} venue={venue} />)
          )
        }
      </div>
      {/* <div className="flex-column cursor-pointer">
        <p className='heading-3 disabled'>Load More</p>
        <FaChevronDown />
      </div> */}
    </div>
  )
}

export default AllVenues