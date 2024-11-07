import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { MUIstyle, login, resetPassword, codeRequired, verifyCodeTitle, sendTitle, errAlert, verifyCode, incorrectCode, minCodeLen } from './Const'
import { port } from '../Const'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './registration.css'

export default function VerifyCode() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const onSubmit = async (data) => {
    try {
        const result = await axios.post(`${ port }${ verifyCode }`, { email, code: data.code })
        if(result.data.success) navigate(resetPassword, { state: { email } })
        else setError("code", { message: incorrectCode })
    } catch (err) { alert(errAlert) }
  }

  return (
    <div className="registration">
      <div className="reset-main-container">
        <h1 className='reset-title'>{ verifyCodeTitle }</h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <TextField
            id="outlined-basic"
            label="Verification Code"
            variant="outlined"
            type="text"
            {...register("code", { 
              required: codeRequired,
              minLength: { 
                value: 6, 
                message: minCodeLen 
              }
            })}
            sx={{ ...MUIstyle }}
          />
          { errors.code && 
            <div className='err'>{ errors.code.message }</div> 
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
