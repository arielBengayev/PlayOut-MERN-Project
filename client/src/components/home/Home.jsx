import { useNavigate } from "react-router-dom"
import ScoreList from "./ScorseList"
import './home.css'

export default function Start(){
     const navigate = useNavigate()

    return (
        <div className="home">
            <h1 className="main-title"> welcom to<br/> play out</h1>
            <ScoreList />
            <button 
             className="start-btn" 
             onClick={ ()=>navigate('/games') }
            >
                start
            </button>
        </div>
    )
}