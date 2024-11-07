import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { MUIstyle, email, emailRequired, errAlert, resetPasswordTitle, sendTitle, incorrectEmail, resetPassword } from './Const'
import { port } from '../Const'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './registration.css'
import { verifyCode } from '../../Const'

export default function ForgatPassword(){
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (userEmail) => {
    try {
        const result = await axios.post(`${ port }${ resetPassword }`, userEmail)
        if(result.data.success) navigate(verifyCode, { state: { email: userEmail.email } })
        else setError(email, { message: incorrectEmail })
    } catch (err) { alert(errAlert) }
  }

  return(
      <div className="registration">
        <div className="reset-main-container">  
          <h1 className='reset-title'>{ resetPasswordTitle }</h1>
          <form onSubmit={ handleSubmit(onSubmit) }>
            <TextField 
              id="outlined-basic" 
              label="Email" 
              variant="outlined" 
              type="email"
              {...register(email, { 
                required: emailRequired,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              })}
              sx= {{  ...MUIstyle }}
            />
            { errors.email && 
            <div className='err'>{ errors.email.message }</div> }  
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