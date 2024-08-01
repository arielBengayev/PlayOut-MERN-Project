import { useState } from "react"
import './memoryGame2.css'

export default function MemoryGame2() {

    const createBord = () => {
        let c = 0
        const board = []
        for(let cell=0; cell<100; cell++){
            board.push(c)
            c++
        }
        return board
    }
    
    const [board, setBoard] = useState(createBord())
    const places = []

    const randomPlace = () => {
        return board[(Math.floor(Math.random()*board.length))]
    }

    do {
        let currentPlace = randomPlace()
        if(!places.includes(currentPlace))
            places.push(currentPlace)
    } while(places.length < 5);

    const match = (cell) => { return places.includes(cell) }

  return (
    <div className='board2'>
        {board.map((cell, cellIdx) => (
        <div key={cellIdx} className = 'cell'>
            { match(cell) && cell }
        </div>
        ))}
    </div>
  )
}
