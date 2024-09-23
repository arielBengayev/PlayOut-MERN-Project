import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { addScore, scoreKey } from "./Const"
import { port } from "../Const"
import { startGamePage } from "../../Const"
import { useLocalStorage } from '../utils/useLocalStorage'
import StopWatch from "../stopWatch/StopWatch"
import MemoryGame from "../games/memoryGame/MemoryGame"
import SpaceInvaders from "../games/spaceInvaders/SpaceInvaders"
import TicTacToe from "../games/ticTacToe/TicTacToe"
import Snake from "../games/snake/Snake"
import WhackAMole from "../games/WhackAMole/WhackAMole"

export default function GameController(){
    
  const [winGame, setWinGame] = useState(false)
  const [win, setWin] = useState(false)
  const games = [ 
    <SpaceInvaders key='1' setWinGame={ setWinGame } />, 
    <MemoryGame key='2' setWinGame={ setWinGame } />, 
    <TicTacToe key='3' setWinGame={ setWinGame } />, 
    <Snake key='4' setWinGame={ setWinGame } />,
    <WhackAMole key='5' setWinGame={ setWinGame } />
  ]
  const randomGame = games[Math.floor(Math.random()*games.length)]
  const [currentGame, setCurrentGame] = useState(randomGame)
  const [playedGames, setPlayedGames] = useState([currentGame.key])
  const { getItem, setItem } = useLocalStorage()
  const score = getItem(scoreKey)
  const navigate = useNavigate()
    

  const addNewScore = async () => {
    try{
      await axios.post(`${ port }${ addScore }`, score)
    } catch (err) { return err }
  }

  const getRandomGame = (excludeGames) => {
      const availableGames = games.filter(game => !excludeGames.includes(game.key))
      return availableGames[Math.floor(Math.random() * availableGames.length)]
  }

  const finishGame = () => {
    if(winGame && playedGames.length < games.length){
      const newGame = getRandomGame(playedGames)
      setPlayedGames([...playedGames, newGame.key])
      setCurrentGame(newGame)
      setWinGame(false)
    }
    else if(winGame) {
      setWin(true)
      setItem(score)
    }
    if(win){
      addNewScore()
      navigate(startGamePage)
    }
  }

  useEffect(() =>{ finishGame() },[winGame, win])

  return (
    <>
      <StopWatch run={ true } win={ win } score={ score } />
      { currentGame }
    </>
  )
}