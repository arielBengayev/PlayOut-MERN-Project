import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import { useStyle } from './StyleContext'
import './registration.css'

export default function SignUp(){
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({email: "", name: "", password: ""})
    const [users, setUsers] = useState([])
    const [err, setErr] = useState({email: false, username: false, password: false})
    const style = useStyle()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (e) => { e.preventDefault() }

    const handleEmail = (e) => {setUser({...user, email: e.target.value})}
    const handleName = (e) => {setUser({...user, name: e.target.value})}
    const handlePassword = (e) => {setUser({...user, password: e.target.value})}

    let newErr = {...err}
    const isEmailCorrect = () => {
        if(!user.email.includes('@') || !user.email.includes('.') || 
           users.find(u => u.email === user.email)) {
            newErr.email = true
            setErr(newErr)
            return false
        } else { 
            newErr.email = false
            setErr(newErr)
        }
        return true
    }

    const isUsernameCorrect = () => {
        if(user.name.trim() === "" || user.name.length < 2 || 
        users.find(u => u.name === user.name)) {
            newErr.username = true
            setErr(newErr)
            return false
        } else {
            newErr.username = false
            setErr(newErr)
        }
        return true
    }

    const isPasswordCorrect = () => {
        if(!/\d/.test(user.password) || user.password.length < 8){
            newErr.password = true
            setErr(newErr)
            return false
        } else {
            newErr.password = false
            setErr(newErr)
        }
        return true
    }

    const addUser = () => {
        if(isEmailCorrect() && isUsernameCorrect() && isPasswordCorrect()){
            axios.post('http://localhost:3001/add', user)
            .then(result => console.log(result))
            .catch(err => console.log(err))
            navigate('/')
        }
    }

    return(
        <div className='registration'>
            <h1 className='main-title'> welcom to<br/> play out</h1>
            <div className="main-container">
                <h1 className='title'>Sign Up</h1>
                <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                value={user.email} 
                onChange={handleEmail} 
                error={err.email} 
                sx= {{ mb: 2, ...style }}
                />
                <TextField 
                id="outlined-basic" 
                label="Username" 
                variant="outlined" 
                value={user.name} 
                onChange={handleName} 
                error={err.username} 
                sx= { { mb: 2, ...style } }
                />
                <FormControl 
                sx={{ width: 225, ...style }} 
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
                <Button 
                variant="outlined" 
                onClick={addUser} 
                sx={{ m:2, width: '120px' }} size='large'
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}