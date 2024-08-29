import React, { useEffect, useState } from "react"
import './WhackAMole.css'
import { gameTitle, molePic } from "./Const"

export default function WhackAMole({ setWinGame }) {

  const randomPlace = () => { return Math.floor(Math.random()*board.length) }

  const board = Array.from({ length: 100 }, (_, index) => index)
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
        const plusInterval = setInterval (changePlace, 2000)
        return () => clearInterval(plusInterval)
  }, [])  

  return (
    <>
      <h1>{ gameTitle }</h1>
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