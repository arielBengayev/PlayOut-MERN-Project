import React, { useEffect, useState } from "react"
import './WhackAMole.css'
import { boardLength, gameTitle, molePic, moveIntervalTime } from "./Const"

export default function WhackAMole({ setWinGame }) {

  const randomPlace = () => { return Math.floor(Math.random()*board.length) }

  const board = Array.from({ length: boardLength }, (_, index) => index)
  const [mole, setMole] = useState({ 
    place: randomPlace(), img: molePic 
  })
  const [clicked, setClicked] = useState(false)
  
  const findPlace = (index) => { return index === mole.place }
  
  const changePlace = () => {
    setMole((m) => { return { ...m, place: randomPlace() } })
  }
  
  const handleClick = (index) => {
    if(findPlace(index)){
      setMole((m) => { return {...m, img: '' } })
      setClicked(true)
      setWinGame(true)
    }
  }
  
  useEffect(()=>{
        const moveInterval = setInterval (changePlace, moveIntervalTime)
        return () => clearInterval(moveInterval)
  }, [])  

  return (
    <>
      <h1 className="title">{ gameTitle }</h1>
      <div className='Whack-a-Mole'>
        {board.map((_, index) => (
          <div 
            key={ index } 
            className='cell' 
            onClick={ () => handleClick(index) }
          >
            { findPlace(index) && <img src={ mole.img } className="mole"/> }
          </div>
        ))}
      </div>
    </>
  )
}