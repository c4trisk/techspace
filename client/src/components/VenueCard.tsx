import React from 'react'
import { Venue } from '../types'
import { FaStar, FaUser, FaRegHeart, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface VenueCardProps {
  venue: Venue
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    venue &&
    <Link to={`/venues/${venue.slug}`} className='VenueCard'>
      <img src={venue.images[0]} alt={venue.venueName} />
      <div className="overlay"></div>
      <div className="dark-overlay"></div>
      <div className="like">
        <FaRegHeart />
      </div>
      <div className="info">
        <div className="top">
          <p className='heading-3'>{venue.address}</p>
          <div className="d-flex-gap">
            <p className='small'>{venue.ratingAvg}</p>
            <FaStar />
          </div>
        </div>
        <div className="d-flex-gap">
          <FaUser />
          <p className="small">{venue.capacity}</p>
        </div>
        <p className="small">From SEK {venue.pricingInformation.pricePerHour}/h</p>
      </div>
    </Link>
  )
}

export default VenueCard