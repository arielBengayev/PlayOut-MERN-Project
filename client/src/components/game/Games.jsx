import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StopWatch from "../stopWatch/StopWatch"
import MemoryGame from "../memoryGame/MemoryGame"
import SpaceInvaders from "../spaceInvaders/SpaceInvaders"
import TicTacToe from "../ticTacToe/TicTacToe"
import Snake from "../snake/Snake"

export default function NextGame(){
    const [win, setWin] = useState(false)
    const games = [ <SpaceInvaders key='1' win={win} setWin={setWin} />, 
                    <MemoryGame key='2' win={win} setWin={setWin} />, 
                    <TicTacToe key='3' win={win} setWin={setWin} />, 
                    <Snake key='4' win={win} setWin={setWin} />]
    const [currentGame, setCurrentGame] = useState(games[Math.floor(Math.random()*games.length)])
    const [playedGames, setPlayedGames] = useState([currentGame.key])
    const navigate = useNavigate()
    

    const getRandomGame = (excludeGames) => {
        const availableGames = games.filter(game => !excludeGames.includes(game.key))
        return availableGames[Math.floor(Math.random() * availableGames.length)]
      }

      const finishGame = () => {
        if(win && playedGames.length < games.length){
            const newGame = getRandomGame(playedGames)
            setPlayedGames([...playedGames, newGame.key])
            setCurrentGame(newGame)
            setWin(false)
        }
        else if(win) navigate('/home')
      }

    useEffect(() =>{
        finishGame()  
    },[win])

    return (
        <>
            <StopWatch run={true}/>
            {currentGame}
        </>
    )
}