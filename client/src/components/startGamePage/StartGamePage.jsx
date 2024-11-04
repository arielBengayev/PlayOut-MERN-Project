import { useNavigate } from "react-router-dom"
import LeaderBoard from "./LeaderBoard"
import Button from '@mui/material/Button'
import { gamePage } from "../../Const"
import { buttonStyle, mainTitle, start } from "./Const"
import './startGamePage.css'

export default function Start(){
  const navigate = useNavigate()

  return (
      <div className="start-game">
        <h1 className="main-title">{ mainTitle }</h1>
          <LeaderBoard />
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