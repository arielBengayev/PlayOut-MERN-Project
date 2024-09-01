import React, { useState, useEffect, useCallback } from 'react'
import { arrowKey, boardLength, finalPlace, firstPlace, gameTitle, invadersIntervalTime, invadersLength, keyDown, limit, nextPlace, shotIntervalTime, startPlace, winCondition } from './Const'
import './spaceInvaders.css'

export default function SpaceInvaders({ setWinGame }){
  const createBoard = useCallback(() => {
    const board = []
    for(let cell=1; cell<boardLength; cell++) board.push(cell)
    return board
  }, [])

  const invadersFill = useCallback(() => {
    const invaders = []
    for(let i=1; i<invadersLength; i++) invaders.push(i)
    return invaders
  }, []) 

  const randomPlace = (min, max) => { 
    return Math.floor(Math.random()*max)+min 
  }  

  const board = createBoard()
  const [tank, setTank] = useState({ 
    tankPlace: startPlace.tank, 
    shot: false, 
    shotPlace: startPlace.shot 
  })
  const [invaders, setInvaders] = useState({ 
    place: invadersFill(), 
    shot: randomPlace(34, 45) 
  }) 

  const invadersCheck = (cell) => { return invaders.place.includes(cell) } 
  const winCheck = () => { if(invaders.place.length === winCondition) setWinGame(true) }

  const removeInvader = () => {
      setInvaders(i => ({...i, place: i.place.filter(invader => 
      tank.shotPlace !== invader)})) 
  } 

  const moveInvaders = useCallback(() => {
    setInvaders((i) => {
      if (i.place[i.place.length - 1] >= finalPlace)
        return { ...i, place: invadersFill() }
      return { ...i, place: i.place.map(invader => invader+nextPlace) }
    })
  }, [invadersFill]) 

  const moveShot = () => {
    if(tank.shot){
      setTank((prevTank) => {
        if (invaders.place.includes(prevTank.shotPlace) || 
        prevTank.shotPlace < firstPlace){
          removeInvader()
          return { ...prevTank, shot: false, shotPlace: startPlace.shot }
        }
        return { ...prevTank, shotPlace: prevTank.shotPlace-nextPlace }
      })
    }
    winCheck()
  } 

  useEffect(()=>{
    const moveTank = (e) => {
      setTank((prevTank) => {
        if (e.key === arrowKey.right && prevTank.tankPlace < limit.right)
          return { ...prevTank, tankPlace: prevTank.tankPlace + 1 }
        else if (e.key === arrowKey.left && prevTank.tankPlace > limit.left)
          return { ...prevTank, tankPlace: prevTank.tankPlace - 1 }
        else if (e.key === arrowKey.space)
          return { ...prevTank, shot: true, shotPlace: prevTank.tankPlace - nextPlace }
        return prevTank
      })
    }
    window.addEventListener(keyDown, moveTank)
    return () => {window.removeEventListener(keyDown, moveTank)}
  }, [tank])

  useEffect(() =>{
    const moveInvadersInterval = setInterval (moveInvaders, invadersIntervalTime)
    return () => clearInterval(moveInvadersInterval)
  },[moveInvaders])  

  useEffect(()=>{
    const moveShotInterval = setInterval(moveShot , shotIntervalTime)
    return () => clearInterval(moveShotInterval)
  },[moveShot])
  
  return(
    <div className='space'>
      <h1 className='title'>{ gameTitle }</h1>
      <div className='board'>
        {board.map((cell, cellIdx) => (
          <div key={cellIdx} className={`cell 
              ${ cell === tank.tankPlace && 'cell-tank' } 
              ${ invadersCheck(cell) && 'cell-invader' }
              ${ tank.shot && cell === tank.shotPlace && 'cell-shot' }
          `}>
          </div>
        ))}
      </div>
    </div>
  )
}