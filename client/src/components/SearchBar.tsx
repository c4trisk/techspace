import { useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { getAllVenues } from '../store/features/venues/venuesSlice'

const SearchBar = () => {

  const dispatch: AppDispatch = useDispatch()

  const [showOptions, setShowOptions] = useState(false)
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    attendees: '',
    price: '',
    catering: false,
    breakoutRooms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(getAllVenues(filters))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: updatedValue }));
  }

  return (
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
              <option disabled  value="placeholder">Select Location</option>
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
              <option  disabled value="placeholder">Select Quantity</option>
              <option value="10">10 attendees or less</option>
              <option value="11-40">11 - 40 attendees</option>
              <option value="41-100">41 - 100 attendees</option>
              <option value="101">101 attendees or more</option>
            </select>
          </div>
          <div className="input-group">
          <label htmlFor="price">Price</label>
            <select name="price" id="price"  value={filters.price} onChange={handleChange}>
              <option disabled value="placeholder">Select Price Range</option>
              <option value="0-400">0 - 400 SEK/h</option>
              <option value="400-800">400 - 800 SEK/h</option>
              <option value="800-1200">800 - 1 200 SEK/h</option>
              <option value="1200-1500">1 20 - 1 500 SEK/h</option>
              <option value="1500">1 500 SEK/h +</option>
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
  )
}

export default SearchBar