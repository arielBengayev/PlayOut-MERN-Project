import { useState, useEffect } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiInputBase-input': {
            color: 'white',
            backgroundColor: 'black',
            '::placeholder': {
              color: 'white',
              opacity: 1,
            },
            '&:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 1000px black inset', 
                  '-webkit-text-fill-color': 'white',
            }
        },
    }

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
            else navigate('/home')
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
                sx= {{ m: 2, ...inputStyle }}
                />
                <FormControl 
                sx={{ mb: 1, width: 225, ...inputStyle }} 
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
                onClick={handleErr} 
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