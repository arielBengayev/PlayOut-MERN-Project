import MemoryGame from "./memoryGame/MemoryGame"
import SpaceInvaders from "./spaceInvaders/SpaceInvaders"
import TicTacToe from "./ticTacToe/TicTacToe"
import Snake from "./snake/Snake"
import StopWatch from "./stopWatch/StopWatch"


export default function RandomGame(){
    const games = [<SpaceInvaders/>, <MemoryGame/>, <TicTacToe/>, <Snake/>]
    return (
        <>
            {/* <StopWatch clicked={true}/> */}
            {games[Math.floor((Math.random()*games.length))]}
        </>    
    )
}