import { useState } from 'react'

const CallToAction = () => {

  const [selectedLocation, setSelectedLocation] = useState()
  const [selectedAttendees, setSelectedAttendees] = useState()
  
  return (
    <div className="CallToAction">
      <h1 className="heading-1">Book Your Next Tech Event Here!</h1>
      <form className="search-form">
        <div className="inputs">
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <select 
              name="location" 
              id="location" 
              value={selectedLocation}
              >
              <option className='disabled' value="placeholder">Select Location</option>
              <option value="Kungsholmen">Kungsholmen</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="attendees">Attendees</label>
            <select 
              name="attendees" 
              id="attendees"
              value={selectedAttendees}
              >
                <option className='disabled' value="placeholder">Select Quantity</option>
              </select>
          </div>
        </div>
        <button className="btn-primary">Search</button>
      </form>
    </div>
  )
}

export default CallToAction