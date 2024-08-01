import React, { useState, useEffect} from "react"
import Board from "./Board"
import './TicTacToe.css'

export default function TicTacToe({ winGame, setWinGame }){
    const [boxes, setBoxes] = useState(Array(9).fill(null))
    const [playerTurn, setPlayerTurn] = useState("x")
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8],[2,4,6]
    ]

    const winCheck = (boxes) => {
        for(let i of winConditions){
            const [a, b, c] = i
            if(boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c])
                return true   
        }
        return false
    }

    const userFill = (index) => {
        if(boxes[index] != null) return
            const updated = [...boxes]
            updated[index] = playerTurn
            setBoxes(updated)
            if(winCheck(updated)) setWinGame(true) 
            else setPlayerTurn("o") 
    }

    useEffect(() =>{
        if(playerTurn === "o" && boxes.includes(null)){
            let randomIdx = null
            do { randomIdx = Math.floor(Math.random()*9) }
            while(boxes[randomIdx] != null);
                const updated = [...boxes]
                updated[randomIdx] = playerTurn
                setBoxes(updated)
                if(winCheck(updated)) setBoxes(Array(9).fill(null)) 
                else setPlayerTurn("x")
        }
        if(!boxes.includes(null) && !winGame) setBoxes(Array(9).fill(null))
    },[boxes, playerTurn])

    return(
      <Board boxes={boxes} playerTurn={playerTurn} fill={userFill} />
    )
}