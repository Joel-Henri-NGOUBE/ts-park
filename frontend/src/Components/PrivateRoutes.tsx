import { Navigate, Outlet } from 'react-router-dom'
import { findIfUserIsSuperAdmin } from '../Utils/functions'

export default function PrivateRoute() {
  return (
    findIfUserIsSuperAdmin() ? <Outlet/> : <Navigate to="/"/>
  )
}