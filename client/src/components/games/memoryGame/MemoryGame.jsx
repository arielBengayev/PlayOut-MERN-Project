import React, {useState, useRef} from 'react'
import { gameTitle, img, name, startCondition, status, winCondition } from './Const'
import Card from './Card'
import './memoryGame.css'

export default function MemoryGame({ setWinGame }){
  const [cards, setCards] = useState([
    { id: 0, name: name.apple, status: status.noStatus, img: img.apple },
    { id: 0, name: name.apple, status: status.noStatus, img: img.apple },
    { id: 1, name: name.spotify, status: status.noStatus, img: img.spotify },
    { id: 1, name: name.spotify, status: status.noStatus, img: img.spotify },
    { id: 2, name: name.youtub, status: status.noStatus, img: img.youtub },
    { id: 2, name: name.youtub, status: status.noStatus, img: img.youtub },
    { id: 3, name: name.html, status: status.noStatus, img: img.html },
    { id: 3, name: name.html, status: status.noStatus, img: img.html },
    { id: 4, name: name.js, status: status.noStatus, img: img.js },
    { id: 4, name: name.js, status: status.noStatus, img: img.js },
    { id: 5, name: name.css, status: status.noStatus, img: img.css },
    { id: 5, name: name.css, status: status.noStatus, img: img.css },
  ].sort(() => Math.random() - 0.5))
  const [previous, setPrevious] = useState(startCondition)
  const count = useRef(0)

  const check = (current) => {
    if(cards[current].id === cards[previous].id && current != previous) {
      const newCards = [...cards]
      newCards[current].status = status.success
      newCards[previous].status = status.success
      setCards([...newCards])
      setPrevious(startCondition)
      count.current++
      if(count.current === winCondition) setWinGame(true)
    } else if(current != previous && cards[current].status !== status.success) {
        const newCards = [...cards]
        newCards[current].status = status.wrong
        newCards[previous].status = status.wrong
        setCards([...newCards])
        setTimeout(() =>{
          const newCards = [...cards]
          newCards[current].status = status.noStatus
          newCards[previous].status = status.noStatus
          setCards([...newCards]) 
            setPrevious(startCondition)
        }, 500)
      }
  }

  const click = (index) =>{
    if(previous === startCondition && cards[index].status === status.noStatus){
      const newCards = [...cards]
      newCards[index].status = status.active
      setCards([...newCards])
      setPrevious(index)
    } else check(index)
  }

  return(
    <div className='memory-game'>
      <h1 className='title'>{ gameTitle }</h1>
      <div className='board'>
        {cards.map((card, index) => 
          <Card  
            card={ card } 
            key={ index } 
            index={ index } 
            click={ click } 
          />
        )}          
      </div>
    </div>
  )
}