import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { MUIstyle, password, signUp, login, passwordRequired, minLenMessage, numberRequired, username, usernameRequired, email, emailRequired, emailTaken, usernameTaken, errAlert, signUpTitle } from './Const'
import { port } from '../Const'
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

export default function SignUp(){
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()  
  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  const handleClickShowPassword = () => setShowPassword((show) => !show) 

  const onSubmit = async (user) => {
    try{
      const result = await axios.post(`${ port }${ signUp }`, user)
      if(result.data.success) navigate(login)
      else{
        if(result.data.emailExists)
          setError(email, { message: emailTaken })
        if(result.data.usernameExists)
          setError(username, { message: usernameTaken })
    }
    }catch (err) { alert(errAlert) }
  }

  return(
    <div className='registration'>
      <div className="main-container">
        <h1 className='title'>{ signUpTitle }</h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            type="email"
            {...register(email, { 
              required: emailRequired,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            sx= {{  ...MUIstyle }}
          />
          { errors.email && <div className='err'>{ errors.email.message }</div> }
          <TextField 
            id="outlined-basic2" 
            label="Username" 
            {...register(username, { 
              required: usernameRequired,
              validate: (value) => {
                if(value.trim() === "") return usernameRequired
                return true
              }
            })}
            variant="outlined" 
            sx= {{ mt: 1.5, ...MUIstyle }}
          />
          { errors.username && <div className='err'>{ errors.username.message }</div> }
          <FormControl sx={{ mt: 1.5, width: 225, ...MUIstyle }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              { password }
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={ showPassword ? 'text' : 'password' }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={ handleClickShowPassword }
                    edge="end"
                  >
                    { showPassword ? 
                    <Visibility sx={{ color: 'white' }}/> : 
                    <VisibilityOff sx={{ color: 'white' }}/> }
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register(password, { 
                required: passwordRequired,
                minLength: { 
                  value: 8, 
                  message: minLenMessage 
                },
                validate: (value) => {
                  if(!/\d/.test(value)) return numberRequired
                  return true
                } 
              })}
            />
          </FormControl>
          { errors.password && 
          <div className='err'>{ errors.password.message }</div> }
          <Button 
            variant="outlined"  
            type="submit"
            sx={{ m:2, width: '120px' }} 
            size='large'
          >
            { signUpTitle }
          </Button>
        </form>
      </div>
    </div>
  )
}