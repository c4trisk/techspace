import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { getAllVenues } from '../store/features/venues/venuesSlice'
import CallToAction from '../components/CallToAction'
import VenueCard from '../components/VenueCard'
import { Venue } from '../types'
import Testimonials from '../components/Testimonials'
import ContactForm from '../components/ContactForm'
import GoogleMaps from '../components/GoogleMaps'
import { Link } from 'react-router-dom'

const Home = () => {

  const dispatch: AppDispatch = useDispatch()
  const { venues, error, loading } = useSelector((state: RootState) => state.venues)

  useEffect(() => {
    dispatch(getAllVenues())
  }, [])

  return (
    <div className='Home'>
      <CallToAction />
      <div className="slogan">
        <h1 className='heading-1'>Innovative Meetings, Easily Booked</h1>
        <h2 className='body'>Welcome to TechSpace Stockholm!</h2>
      </div>
      <div className="popular-venues">
        <h3 className='heading-2'>Popular Venues</h3>
        <div className="venues">
          { error && <p>{error}</p>}
          { loading && <p>{loading}</p>}
          { venues.length > 0 && 
          <>
            { venues.map((venue: Venue) => <VenueCard key={venue._id} venue={venue} />) }
          </>}
        </div>
        <Link to="venues" className='nav-btn btn-primary'>See All Venues</Link>
      </div>
      <Testimonials />
      <div id="about" className="about">
        <h3 className='heading-2'>About TechSpace</h3>
        <div className="d-flex">
          <img src="https://images.unsplash.com/photo-1497217968520-7d8d60b7bc25?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Office Building Stockholm" />
          <p className="body">TechSpace is an innovative company based in Stockholm, offering a unique platform for tech companies and businesses in the digital sector to rent conference rooms and meeting spaces. Our company aims to revolutionize the way tech companies and their teams meet and collaborate. We strive to provide customized meeting environments that foster creativity, innovation, and business success.</p>
        </div>
      </div>
      <div className="contact">
        <ContactForm />
        <div className="find-us">
          <div>
            <h3 className="heading-1">Find Us</h3>
            <h4 className="heading-3">Phone</h4>
            <p className="small">+46(0) 50-409 58 35</p>
            <h4 className='heading-3'>Address</h4>
            <p className="small">Götgatsbacken 12</p>
            <p className="small">118 46 Stockholm</p>
          </div>
          <div className="maps">
            <GoogleMaps address='Götgatsbacken 12' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home