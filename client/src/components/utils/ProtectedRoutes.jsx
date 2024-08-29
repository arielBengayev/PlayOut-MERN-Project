import { Outlet, Navigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import { homePage } from '../../Const'
import { signedInKey } from '../registration/Const'

export default function ProtectedRoutes() {
  const { getItem } = useLocalStorage()
  const inTest = true
  return getItem(signedInKey) ? <Outlet/> : <Navigate to={ homePage }/>
}