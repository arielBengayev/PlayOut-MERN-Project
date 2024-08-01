import React, { useState, useEffect, useCallback } from 'react'
import './spaceInvaders.css'

export default function SpaceInvaders({ setWinGame }){

    const createBoard = useCallback(() => {
        let c = 1
        const board = []
        for(let cell=0; cell<121; cell++){
            board.push(c)
            c++
        }
        return board
    }, [])

    const invadersFill = useCallback(() => {
        const invaders = []
        for(let i=1; i<34; i++) invaders.push(i)
        return invaders
    }, [])

    const randomPlace = (min, max) => { 
        return Math.floor(Math.random()*max)+min 
    }

    const board = createBoard()
    const [tank, setTank] = useState({ 
        tankPlace: 116, 
        shot: false, 
        shotPlace: 0 
    })
    const [invaders, setInvaders] = useState({ 
        place: invadersFill(), 
        shot: randomPlace(34, 45) 
    })

    const invadersCheck = (cell) => { return invaders.place.includes(cell) }

    const removeInvader = () => {
        setInvaders(i => ({...i, place: i.place.filter(invader => 
            tank.shotPlace !== invader)})) 
    }

    const moveInvaders = useCallback(() => {
        setInvaders((i) => {
            if (i.place[i.place.length - 1] >= 109)
                return { ...i, place: invadersFill() }
            return { ...i, place: i.place.map(invader => invader+11) }
        })
    }, [invadersFill])

    const moveShot = () => {
        if(tank.shot){
            setTank((prevTank) => {
                if (invaders.place.includes(prevTank.shotPlace) || 
                    prevTank.shotPlace < 11){
                        removeInvader();
                        return { ...prevTank, shot: false, shotPlace: 0 }
                }
                return { ...prevTank, shotPlace: prevTank.shotPlace-11 }
            })
        }
        winCheck()
    }

    const winCheck = () => { if(invaders.place.length === 0) setWinGame(true) }

    useEffect(()=>{
        const moveTank = (e) => {
            setTank((prevTank) => {
                if (e.key === 'ArrowRight' && prevTank.tankPlace < 121)
                    return { ...prevTank, tankPlace: prevTank.tankPlace + 1 }
                else if (e.key === 'ArrowLeft' && prevTank.tankPlace > 111)
                    return { ...prevTank, tankPlace: prevTank.tankPlace - 1 }
                else if (e.key === ' ')
                    return { ...prevTank, shot: true, shotPlace: prevTank.tankPlace - 11 }
                return prevTank;
            });
        }
        window.addEventListener('keydown', moveTank)
        return () => {window.removeEventListener('keydown', moveTank)}
    }, [tank])

    useEffect(() =>{
        const moveInvadersInterval = setInterval (moveInvaders, 1200)
         return () => clearInterval(moveInvadersInterval)
    },[moveInvaders])

    useEffect(()=>{
        const moveShotInterval = setInterval(moveShot , 10)
        return () => clearInterval(moveShotInterval)
    },[moveShot])
    
    return(
      <>
        <div className='space'>
            {board.map((cell, cellIdx) => (
                <div key={cellIdx} className={`space-cell 
                    ${ cell === tank.tankPlace && 'space-cell-tank' } 
                    ${ invadersCheck(cell) && 'space-cell-invader' }
                    ${ tank.shot && cell === tank.shotPlace && 'space-cell-shot' }
                `}>
                </div>
            ))}
        </div>
      </>
    )
}