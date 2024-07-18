import React, { useState } from "react"
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

export default function MuiTest() {
    const [showPassword, setShowPassword] = useState(false)
    const [err, setErr] = useState(false)
    const [name, setName] = useState("")
    const handleName = (e) => { setName(e.target.value) }

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (e) => { e.preventDefault() }
    const handleErr = () => {
        if(name != "ariel") setErr(true)
    }

  return (
    <>
        <TextField id="outlined-basic" label="Username" variant="outlined" error={err} value={name} onChange={handleName}/><br/>
        <FormControl sx={{ m: 1, width: 225}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl><br/>
        <Button variant="outlined" onClick={handleErr}>Outlined</Button>
    </>
  )
}
