import React, {useState, useEffect} from 'react'
import './spaceInvaders.css'

//fix shot bug 
//invaders shot
//ship life

export default function SpaceInvaders(){
    const createBord = () => {
        let c = 1
        const board = []
        for(let row=0; row<11; row++){
            const currentRow = []
            for(let col=0; col<11; col++){currentRow.push(c++)}
            board.push(currentRow)
        }
        return board
    }
    const invadersFill = () => {
        const invaders = []
        for(let i=1; i<34; i++){
            //if(i>1 && i<11 || i>12 && i<22 || i>23 && i<33)
                invaders.push(i)
        }
        return invaders
    }
    const board = createBord()
    const [tank, setTank] = useState(116)
    const [invaders, setInvaders] = useState(invadersFill())
    //const [removeInvaders, setRemoveInvaders] = useState(invadersFill())
    const [tankShot, setTankShot] = useState(false)
    const [shotPlace, setShotPlace] = useState(0)
    //const [invaderShotPlace, setInvaderShotPlace] = useState(Math.floor((Math.random() * invaders.length+11) + invaders.length+1))

    const invadersCheck = (cell) => {
        for(let i of invaders) if(cell === i) return true
        return false
    }

    const moveTank = (e) => {
        if(e.key === 'ArrowRight' && tank < 121) setTank(tank+1)
        else if(e.key === 'ArrowLeft' && tank > 111) setTank(tank-1)
        else if(e.key === 'ArrowUp'){ 
            setTankShot(true)
            setShotPlace(tank-11)
        }
    }

    const removeInvader = () => {
        setInvaders(i => i.filter((invader) => shotPlace != invader)) 
    }

    const moveInvaders = () => {
        if(invaders[invaders.length-1] < 109){
            setInvaders(i => i.map((invader) => invader+11))
        }else {
            setInvaders(i => i.map((invader) => invader-78))
            setInvaders(invadersFill())
        }
    }

    const moveShot = () => {
        if(tankShot){
            setShotPlace((s) => s-11)
            if(invaders.find((invader) => shotPlace === invader) || shotPlace < 11){ 
                removeInvader()
                setTankShot(false)
                setShotPlace(0)
            }
        }
        win()
    }

    const win = () => {if(invaders.length === 0) setStatus(true)}
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() =>{
        const moveInvadersInterval = setInterval (moveInvaders, 1000)
         return () => clearInterval(moveInvadersInterval)
    },[invaders])

    useEffect(()=>{
        const moveShotInterval = setInterval(moveShot , 10)
        return () => clearInterval(moveShotInterval)
    },[shotPlace])


    // useEffect(()=>{
    //     const invaderShot = setInterval(()=>{ 
    //         //setInvaderShotPlace(invaders[Math.floor((Math.random()*44)+34)])
    //         //console.log(invaderShotPlace)
    //         setInvaderShotPlace(invaderShotPlace+11)
    //     }, 500)
    //     return () => clearInterval(invaderShot)
    // },[invaderShotPlace])

    // useEffect(()=>{
    //     const move = setInterval(()=>{
    //         setInvaderShotPlace(invaderShotPlace+11)
    //     }, 200)
    //     return () => clearInterval(move)
    // },[invaderShotPlace])
    
    return(
        <>
            <div className='space' onKeyDown={moveTank} tabIndex="0">
                {board.map((row, rowIdx) => (
                    <div key={rowIdx} className="space-row">{
                        row.map((cell, cellIdx) => (
                        <div key={cellIdx} className={`space-cell 
                            ${cell === tank && 'space-cell-tank'} 
                            ${invadersCheck(cell) && 'space-cell-invader'}
                            ${tankShot && cell === shotPlace && 'space-cell-shot'}
                           `}>
                        </div>
                        ))}
                    </div> 
                ))}
             </div>
         </>
    );
}
//${cell === invaderShotPlace && 'space-cell-shot'}