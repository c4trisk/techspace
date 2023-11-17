import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import SearchBar from "../components/SearchBar"
import { getAllVenues } from '../store/features/venues/venuesSlice'
import VenueCard from '../components/VenueCard'
import { Venue } from '../types'
import { FaChevronDown } from 'react-icons/fa'
import { LuSettings2 } from 'react-icons/lu'

const AllVenues = () => {
  const dispatch: AppDispatch = useDispatch()
  const { venues, error, loading } = useSelector((state: RootState) => state.venues)

  useEffect(() => {
    dispatch(getAllVenues())
  }, [])

  return (
    <div className="AllVenues">
      <SearchBar />
      <div className="d-flex">
        <h2 className="heading-2">All Venues</h2>
        <div className="d-flex">
          <LuSettings2 className="icon" />
          <p className="small">Price Ascending</p>
        </div>
      </div>
      <div className="venues">
        { error && <p>{error}</p> }
        { loading && <p>Loading...</p> }
        { venues.length > 0 && (
          venues.map((venue: Venue) => <VenueCard key={venue._id} venue={venue} />)
        ) }
      </div>
      <div className="flex-column cursor-pointer">
        <p className='heading-3 disabled'>Load More</p>
        <FaChevronDown />
      </div>
    </div>
  )
}

export default AllVenues