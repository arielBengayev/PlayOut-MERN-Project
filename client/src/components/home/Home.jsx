import React, { useState } from "react"
import StopWatch from '../stopWatch/StopWatch'
import RandomGame from "../RandomGame"
import ScoreList from "./ScorseList"
import './home.css'

export default function Start(){
    const [clicked, setClicked] = useState(false)
    const handleClicked = () => {setClicked(true)}

    return (
        <div>
            {!clicked &&<ScoreList />}
            {!clicked && <button className="start-btn" onClick={handleClicked}>start</button>}
            {clicked && <StopWatch clicked={clicked}/> } 
            {clicked && <RandomGame />}
        </div>
    )
}