import React, { useState, useEffect} from "react"
import Board from "./Board"
import './TicTacToe.css'

export default function TicTacToe({ setWin }){
    const [boxes, setBoxes] = useState(Array(9).fill(null))
    const [playerTurn, setPlayerTurn] = useState("x")
    const [user, setUser] = useState(true)
    const winConditions = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8],[2,4,6]]

    const winCheck = (boxes) =>{
        for(let i of winConditions){
            if(boxes[i[0]] && boxes[i[0]] === boxes[i[1]] && boxes[i[1]] === boxes[i[2]])
                return true   
        }
        return false
    }
    const userFill = (index) =>{
        if(boxes[index] != null) return
        if(user){
            const updated = [...boxes]
            updated[index] = playerTurn
            setBoxes(updated)
            if(winCheck(updated)) setWin(true)    
            setPlayerTurn("o")
            setUser(false)
        } 
    }
    useEffect(() =>{
        if(playerTurn === "o" && boxes.includes(null)){
            let randomIdx = null
            do { 
                randomIdx = Math.floor(Math.random()*9)
                const updated = [...boxes]
                updated[randomIdx] = playerTurn
                setBoxes(updated)
                if(winCheck(updated)) setBoxes(Array(9).fill(null))    
                setUser(true)
                setPlayerTurn("x")
            }
            while(boxes[randomIdx] != null);
        }else if(!boxes.includes(null)) setBoxes(Array(9).fill(null))
    },[boxes])
    return(
        <div>
            <Board boxes={boxes} playerTurn={playerTurn} fill={userFill}/>
        </div>
    )
}