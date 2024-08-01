import { useNavigate } from "react-router-dom"
import ScoreList from "./ScorseList"
import Button from '@mui/material/Button'
import './home.css'

export default function Start(){
  const navigate = useNavigate()

  return (
    <div className="home">
      <h1 className="main-title"> welcom to<br/> play out</h1>
        <ScoreList />
        <Button 
        variant="outlined" 
        onClick={ ()=>navigate('/games') } 
        sx={{ width: '200px', fontSize: '40px' }}
        >
          start
        </Button>
    </div>
  )
}