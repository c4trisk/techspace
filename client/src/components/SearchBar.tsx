import { useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'

const SearchBar = () => {

  const [showOptions, setShowOptions] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='SearchBar'>
      <h1 className='heading-3'>What Kind of Venue Are You Looking For?</h1>
      <form onSubmit={handleSubmit} className="searchForm">
        <div className="inputs">
          <div className="input-group">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" />
          </div>
          <div className="input-group">
          <label htmlFor="location">Location</label>
          <select name="location" id="location">
            <option disabled selected value="placeholder">Select Location</option>
            <option value="Gamla Stan">Gamla Stan</option>
            <option value="Kungsholmen">Kungsholmen</option>
            <option value="Norrmalm">Norrmalm</option>
            <option value="Södermalm">Södermalm</option>
          </select>
          </div>
          <div className="input-group">
          <label htmlFor="attendees">Attendees</label>
          <select name="attendees" id="attendees">
            <option selected disabled value="placeholder">Select Quantity</option>
            <option value="10">10 attendees or less</option>
            <option value="11-40">11 - 40 attendees</option>
            <option value="41-100">41 - 100 attendees</option>
            <option value="101">101 attendees or more</option>
          </select>
          </div>
          <div className="input-group">
          <label htmlFor="price">Price</label>
          <select name="price" id="price">
            <option selected disabled value="placeholder">Select Price Range</option>
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
            <input type="checkbox" name="catering" id="catering" />
            <label className='small' htmlFor="catering">Offers Catering</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="breakoutRooms" id="breakoutRooms" />
            <label className='small' htmlFor="breakoutRooms">Breakout Rooms</label>
          </div>
        </div>}
      </form>
    </div>
  )
}

export default SearchBar