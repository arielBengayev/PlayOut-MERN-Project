import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { MUIstyle, login, resetPasswordTitle, passwordRequired, minLenMessage, sendTitle, errAlert, numberRequired, resetPasswordConfirm, FailedAlert, password } from './Const'
import { port } from '../Const'
import Button from '@mui/material/Button'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import './registration.css'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${ port }${ resetPasswordConfirm }`, { email, newPassword: data.newPassword })
      if(result.data.success) navigate(login)
      else alert(FailedAlert)
    } catch (err) { alert(errAlert) }
  }

  return (
    <div className="registration">
      <div className="reset-main-container">
        <h1 className='reset-title'>{ resetPasswordTitle }</h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <FormControl sx={{ width: 225, ...MUIstyle }} variant="outlined">
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
            {...register("newPassword", { 
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
          { errors.newPassword && 
            <div className='err'>{ errors.newPassword.message }</div> 
          }
          <Button
            variant="outlined"
            type="submit"
            sx={{ m:2, width: '120px' }}
            size='large'
          >
            { sendTitle }
          </Button>
        </form>
      </div>
    </div>
  )
}