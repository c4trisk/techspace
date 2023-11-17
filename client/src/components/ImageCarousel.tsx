import { useState } from 'react'
import { Venue } from '../types'
import GoogleMaps from './GoogleMaps'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
interface ImageCarouselProps {
  venue: Venue
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ venue }) => {

  const [selectedImage, setSelectedImage] = useState(venue.images[0])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleThumbnailClick = (image: any) => {
    setSelectedImage(image)
  }

  const handleArrowClick = (direction: any) => {
    const nextIndex = 
      direction === 'next'
        ? (activeIndex + 1) % venue.images.length
        : (activeIndex - 1 + venue.images.length) % venue.images.length

    setSelectedImage(venue.images[nextIndex])
    setActiveIndex(nextIndex)
  }

  return (
    <div className='ImageCarousel'>
      <div className="top">
        <div className="main-image">
          <img src={selectedImage} alt="Venue Image" />
        </div>
        <div className="maps">
          <GoogleMaps address={venue.address} />
        </div>
      </div>
      <div className="thumbnails">
        <FaChevronCircleLeft className="cursor-pointer" onClick={() => handleArrowClick('prev')} />
        { venue.images.map((image: any, index: number) => (
          <img 
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(image)}
            className={selectedImage === image ? 'active' : ''}
          />
        ))}
        <FaChevronCircleRight className="cursor-pointer" onClick={() => handleArrowClick('next')}/>
      </div>
    </div>
  )
}
