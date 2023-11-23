import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CallToAction = () => {

  const navigate = useNavigate()

  const [filters, setFilters] = useState({
    location: '',
    attendees: ''
  })


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const queryParams = new URLSearchParams()
    if (filters.location) queryParams.append('location', filters.location)
    if (filters.attendees) queryParams.append('location', filters.attendees)

    const searchQuery = queryParams.toString()
    navigate(`/venues?${searchQuery}`)
  }


  
  return (
    <div className="CallToAction">
      <h1 className="heading-1">Book Your Next Tech Event Here!</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="inputs">
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
        </div>
        <button className="btn-primary">Search</button>
      </form>
    </div>
  )
}

export default CallToAction