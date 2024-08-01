import { useState, useEffect } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"

import { useLocalStorage } from '../useLocalStorage'
import { useStyle } from './StyleContext'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'

import './registration.css'

export default function LogIn(){
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({name: "", password: ""})
    const [users, setUsers] = useState([])
    const [err, setErr] = useState({username: false, password: false})
    const { setItem } = useLocalStorage()
    const style = useStyle()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (e) => { e.preventDefault() }

    const handleName = (e) => {setUser({...user, name: e.target.value})}
    const handlePassword = (e) => {setUser({...user, password: e.target.value})}

    const handleErr = () => {
        const foundUser = users.find(u => u.name === user.name)
        let newErr = { username: false, password: false }
        if (!foundUser) newErr.username = true
        else {
            if (foundUser.password !== user.password)
              newErr.password = true
            else {
              setItem(user.name)  
              navigate('/home')
            }
        }
        setErr(newErr)
    }
       
    
    return(
        <div className='registration'>
            <h1 className='main-title'> welcom to<br/> play out</h1>
            <div className="main-container">
                <h1 className='title'>login</h1>
                <TextField 
                id="outlined-basic" 
                label="Username" 
                variant="outlined" 
                value={user.name} 
                onChange={handleName} 
                error={err.username} 
                sx= {{ m: 2, ...style }}
                />
                <FormControl 
                sx={{ mb: 1, width: 225, ...style }} 
                variant="outlined"
                >
                 <InputLabel htmlFor="outlined-adornment-password">
                     Password
                 </InputLabel>
                 <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                         {showPassword ? <Visibility sx={{ color: 'white' }}/> : 
                         <VisibilityOff sx={{ color: 'white' }}/> }
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={user.password}
                  onChange={handlePassword}
                  error={err.password}
                 />
                </FormControl>
                <NavLink to='/reset' className='forgat-password'>
                  Forgat Password?
                </NavLink>
                <Button 
                variant="outlined" 
                onClick={ handleErr } 
                sx={{ m:2, width: '120px' }} size='large'
                >
                  login
                </Button>
                <label className='new-member'>
                    new member? 
                    <NavLink to='/signUp' className='sign-up'>
                        Sign Up
                    </NavLink>
                </label>
            </div>  
        </div>
    )
}