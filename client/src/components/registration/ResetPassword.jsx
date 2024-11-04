import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { MUIstyle, login, resetPasswordTitle, passwordRequired, minLenMessage, sendTitle, errAlert, numberRequired, resetPasswordConfirm, FailedAlert } from './Const'
import { port } from '../Const'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './registration.css'

export default function ResetPassword() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

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
          <TextField
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            type="password"
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
            sx={{ ...MUIstyle }}
          />
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