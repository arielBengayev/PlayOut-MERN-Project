import { useNavigate } from "react-router-dom"
import ScoreList from "./ScorseList"
import Button from '@mui/material/Button'
import { gamePage } from "../../Const"
import { mainTitle } from "../Const"
import { buttonStyle, start } from "./Const"
import './scores.css'

export default function Start(){
  const navigate = useNavigate()

  return (
    <div className="home">
      <h1 className="main-title">{ mainTitle }</h1>
        <ScoreList />
        <Button 
          variant="outlined" 
          onClick={ ()=>navigate(gamePage) } 
          sx={ buttonStyle }
        >
          { start }
        </Button>
    </div>
  )
}