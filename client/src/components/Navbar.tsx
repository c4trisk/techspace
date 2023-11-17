import { NavLink } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { Link } from "react-router-dom"
import logo from '../assets/techspace-logo.png'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from "react-redux"
import { logout } from "../store/features/auth/authSlice"

const Navbar = () => {

  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  return (
    <nav className="Navbar">
      <div >
        <Link to='/'><img className="logo" src={logo} alt="TechSpace Logo" /></Link>
      </div>
      <ul className="nav-links">
        <li><NavLink to='/venues' className='nav-link heading-3'>All Venues</NavLink></li>
        <li><HashLink to="/#about" className='nav-link heading-3'>About Us</HashLink></li>
        
          {
          user !== null
          ? <>
            <li><Link to='/profile' className='nav-link heading-3 icon'><FaUserCircle /></Link></li>
            <li><p className='nav-link heading-3' onClick={() => dispatch(logout())}>Logout</p></li>
            </>
          : <li><NavLink to='/login' className='nav-link heading-3'>Login</NavLink></li>
          }
          
          
      </ul>

    </nav>
  )
}

export default Navbar