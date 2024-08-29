import React, { useState, useEffect} from "react"
import { boardLength, gameTitle, oTurn, winConditions, xTurn } from "./Const"
import Board from "./Board"
import './TicTacToe.css'

export default function TicTacToe({ winGame, setWinGame }){
  const [boxes, setBoxes] = useState(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState(xTurn)

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
    else setPlayerTurn(oTurn) 
  }

  useEffect(() =>{
    if(playerTurn === oTurn && boxes.includes(null)){
      let randomIdx = null
      do { randomIdx = Math.floor(Math.random()*boardLength) }
      while(boxes[randomIdx] != null)
      const updated = [...boxes]
      updated[randomIdx] = playerTurn
      setBoxes(updated)
      if(winCheck(updated)) setBoxes(Array(9).fill(null)) 
      else setPlayerTurn(xTurn)
    }
    if(!boxes.includes(null) && !winGame) setBoxes(Array(9).fill(null))
  },[boxes, playerTurn])

  return(
    <div className="tic-tac-toe">
      <h1 className="title">{ gameTitle }</h1>
      <Board 
        boxes={ boxes } 
        playerTurn={ playerTurn } 
        fill={ userFill } 
      />
    </div>
  )
}