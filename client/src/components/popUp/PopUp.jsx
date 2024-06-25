import { useNavigate } from "react-router-dom"
import './popUp.css'
import { useState } from "react"


export default function PopUp({ status }){
    const navigate = useNavigate()
    const [name, setName] = useState('/game')

    const handleNavigate = () => {
        if(status.name === 'snake') navigate('/game2')
    }

    return(
        <>
            {status.win && (
               <div className="pop-up">
                    <div className="pop-up-content">
                        <h2>next game</h2>
                        <button className="close-btn" onClick={handleNavigate}>left</button>
                        <button className="close-btn" onClick={handleNavigate}>right</button>
                    </div>
                </div>
            )}
        </>
    )}