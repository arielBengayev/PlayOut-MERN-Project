import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import StopWatch from '../stopWatch/StopWatch'
import RandomGame from "../RandomGame"
import ScoreList from "./ScorseList"
import './home.css'

export default function Start(){
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {setIsMenuOpen(!isMenuOpen)}

    return (
        <div>
            <div className="menu-button" onClick={toggleMenu}>
                &#9776;
            </div>
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="menu-item">Item 1</div>
            </div>
            <ScoreList />
            <button className="start-btn" onClick={() => navigate()}>start</button>
        </div>
    )
}