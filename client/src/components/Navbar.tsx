import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import logo from '../assets/techspace-logo.png'
import { FaUserCircle, FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from "react-redux"
import { logout } from "../store/features/auth/authSlice"
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { useModal } from '../context/ModalContext'

const Navbar = () => {

  const dispatch = useDispatch()
  
  const { user } = useSelector((state: RootState) => state.auth)
  const { showLoginModal, showSignupModal, setShowLoginModal } = useModal()

  const [showMenu, setShowMenu] = useState(false)

  const toggleLoginModal = () => {
    setShowLoginModal((prev) => !prev)
  }


  return (
    <nav className={`Navbar ${showMenu ? 'showMenu' : ''}`}>
      <div >
        <Link to='/'><img className="logo" src={logo} alt="TechSpace Logo" /></Link>
      </div>
      <div className="hamburger" onClick={() => setShowMenu(state => !state)}>
        <FaBars />
      </div>
      <ul className='nav-links'>
        <li><NavLink to='/venues' className='nav-link heading-3'>All Venues</NavLink></li>
        <li><HashLink 
          to="/#about"
          scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'end' })} 
          className='nav-link heading-3'>About Us</HashLink></li>
          {
          user !== null
          ? <>
            <li><Link to='/profile' className='nav-link heading-3 icon'><FaUserCircle /></Link></li>
            <li><p className='nav-link heading-3' onClick={() => dispatch(logout())}>Logout</p></li>
            </>
          : <li><p className='nav-link heading-3' onClick={toggleLoginModal}>Login</p></li>
          }
          { showLoginModal && <Login /> }
          { showSignupModal && <Signup /> }
      </ul>
    </nav>
  )
}

export default Navbar