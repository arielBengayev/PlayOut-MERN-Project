import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { useLocalStorage } from './useLocalStorage'

import StopWatch from "./stopWatch/StopWatch"
import MemoryGame from "./memoryGame/MemoryGame"
import SpaceInvaders from "./spaceInvaders/SpaceInvaders"
import TicTacToe from "./ticTacToe/TicTacToe"
import Snake from "./snake/Snake"

export default function RandomGame(){
    const [winGame, setWinGame] = useState(false)
    const [win, setWin] = useState(false)
    const games = [ 
      <SpaceInvaders key='1' setWinGame={ setWinGame } />, 
      <MemoryGame key='2' setWinGame={ setWinGame } />, 
      <TicTacToe key='3' setWinGame={ setWinGame } />, 
      <Snake key='4' setWinGame={ setWinGame } />
    ]
    const randomGame = games[Math.floor(Math.random()*games.length)]
    const [currentGame, setCurrentGame] = useState(randomGame)
    const [playedGames, setPlayedGames] = useState([currentGame.key])
    const { getItem } = useLocalStorage()
    const [score, setScore] = useState({ name: getItem(), time: "" })
    const navigate = useNavigate()
    

    const addScore = () => {
      axios.post('http://localhost:3001/addScore', score)
      .then(result => console.log(result))
      .catch(err => console.log(err))
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
          addScore()
          navigate('/home')
        }
      }

    useEffect(() =>{
      finishGame()  
    },[winGame])

    return (
      <>
        <StopWatch 
          run={ true } 
          win={ win } 
          setScore={ setScore } 
          score={ score } 
        />
        { currentGame }
      </>
    )
}