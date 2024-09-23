import { mainTitle } from '../Const'
import Button from '@mui/material/Button'
import { NavLink } from "react-router-dom"
import { loginTitle, singupTitle } from './Const'
import { loginPage, signUpPage } from '../../Const'
import './home.css'

export default function Home() {
  return ( 
    <div className="home-page">
      <h1>{ mainTitle }</h1>
      <NavLink to={ loginPage }>
        <Button 
          variant="outlined" 
          sx={{ m:2, width: '120px' }} 
          size='large'
        >
          { loginTitle }
        </Button>
      </NavLink>
      <NavLink to={ signUpPage }>
        <Button 
          variant="outlined" 
          sx={{ m:2, width: '120px' }} 
          size='large'
        >
          { singupTitle }
        </Button>
      </NavLink>
    </div>
  )
}
