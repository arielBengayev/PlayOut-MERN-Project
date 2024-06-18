//import React, {useState} from "react"
import './popUp.css'

export default function PopUp({status}){
    // const nextGame = game
    // const click = () => {return nextGame}
    return(
        <>
            {status && (
               <div className="pop-up">
                    <div className="pop-up-content">
                        <h2>next game</h2>
                        <button className="close-btn" >left</button>
                        <button className="close-btn" >right</button>
                    </div>
                </div>
            )}
        </>
    )}