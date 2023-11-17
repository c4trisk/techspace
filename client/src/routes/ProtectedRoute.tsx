import { ReactNode } from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { isAuthenticated } from "../helpers/authenticate"

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  
  const location = useLocation()
  const authenticated = isAuthenticated()

  return authenticated ? children : <Navigate to='/login' replace state={{ from: location.pathname }} />
}