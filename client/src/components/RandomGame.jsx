import MemoryGame from "./memoryGame/MemoryGame"
import SpaceInvaders from "./spaceInvaders/SpaceInvaders"
import TicTacToe from "./ticTacToe/TicTacToe"
import Snake from "./snake/Snake"

export default function RandomGame(){
    const games = [<SpaceInvaders/>, <MemoryGame/>, <TicTacToe/>, <Snake/>]
    return (
        <>
            {games[Math.floor((Math.random()*games.length))]}
        </>    
    )
}