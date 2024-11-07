import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import { forgatPassword, login, loginTitle, newMember, signUpTitle, MUIstyle, password, incorrectMessage, username, usernameRequired, passwordRequired, scoreKey, signedInKey, errAlert } from './Const'
import { port } from '../Const'
import { resetPassword, startGamePage, signUpPage } from '../../Const'
import { useLocalStorage } from '../utils/useLocalStorage'
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

export default function Login(){
  const [showPassword, setShowPassword] = useState(false)
  const { setItem } = useLocalStorage()
  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  setItem(signedInKey, false)
  
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const onSubmit = async (user) => { 
    try{
      const result = await axios.post(`${ port }${ login }`, user)
      if(result.data.success){
        const score = { username: user.username, time: "" }
        setItem(scoreKey, score) 
        setItem(signedInKey, true)
        navigate(startGamePage) 
      }
      else setError(username, { message: incorrectMessage })
    } catch (err) { alert(errAlert) }
  }

  return(
    <div className='registration'>
      <div className="main-container">
        <h1 className='title'>{ loginTitle }</h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <TextField 
            id="outlined-basic" 
            label="Username"
            {...register(username, { required: usernameRequired })}
            variant="outlined" 
            sx= {{ ...MUIstyle }}
          />
          { errors.username && <div className='err'>{ errors.username.message }</div> }
          <FormControl sx={{ m: 2, width: 225, ...MUIstyle }} variant="outlined">
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
              {...register(password, { required: passwordRequired })}
            />
          </FormControl>
          { errors.password && 
          <div className='err'>{ errors.password.message }</div> }
          <NavLink to={ resetPassword } className='forgat-password'>
            { forgatPassword }
          </NavLink>
          <Button 
          variant="outlined" 
          type="submit" 
          sx={{ m:2, width: '120px' }} 
          size='large'
          >
            { loginTitle }
          </Button>
        </form>
        <label className='new-member'>
            { newMember } 
            <NavLink to={ signUpPage } className='sign-up'>
                { signUpTitle }
            </NavLink>
        </label>
      </div>
    </div>
  )
}