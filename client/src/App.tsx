import React from 'react'
import './styles/index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AllVenues from './pages/AllVenues'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import masthead from './assets/masthead.jpg'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ConfirmBooking from './pages/ConfirmBooking'
import Confirmation from './pages/Confirmation'
import Profile from './pages/Profile'
import { ProtectedRoute } from './routes/ProtectedRoute'
import VenueDetails from './pages/VenueDetails'
import BookingDetails from './pages/BookingDetails'
import { ModalProvider } from './context/ModalContext'

const App: React.FC = () => {

  return (
    <ModalProvider>
      <div className="masthead">
        <img src={masthead} alt="" />
      </div>
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='venues' element={<AllVenues />} />
          <Route path='login' element={<Login />} />
          {/* <Route path='signup' element={<Signup />} /> */}
          <Route path='profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='venues/:slug' element={<VenueDetails />} />
          <Route path='confirm' element={
            <ProtectedRoute>
              <ConfirmBooking />
            </ProtectedRoute>
          } />
          <Route path='confirmation' element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          } />
          <Route path='booking/:id' element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          } />

        </Routes>
      </div>
      <Footer />
    </ModalProvider>
  )

}

export default App