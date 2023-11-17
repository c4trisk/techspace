import { useSelector } from "react-redux"
import { RootState } from "../store"


export const isAuthenticated = () => {

  let authenticated = false
  
  const { user } = useSelector((state: RootState) => state.auth)

  if (user !== null) {
    authenticated = true
  }

  return authenticated
}