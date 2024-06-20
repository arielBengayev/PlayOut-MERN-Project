import { useNavigate } from "react-router-dom"
import './popUp.css'

export default function PopUp({status}){
    const navigate = useNavigate()

    const handleNavigate = () =>{navigate('/game')}
    
    return(
        <>
            {/* {status && (
               <div className="pop-up">
                    <div className="pop-up-content">
                        <h2>next game</h2>
                        <button className="close-btn" onClick={handleNavigate}>left</button>
                        <button className="close-btn" >right</button>
                    </div>
                </div>
            )} */}
            <div className="pop-up">
                <div className="pop-up-content">
                    <h2>next game</h2>
                    <button className="close-btn" onClick={handleNavigate}>left</button>
                    <button className="close-btn" >right</button>
                </div>
            </div>
        </>
    )}