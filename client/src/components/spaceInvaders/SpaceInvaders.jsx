import React, {useState, useEffect, useCallback} from 'react'
import './spaceInvaders.css'


export default function SpaceInvaders({ setWin }){

    const createBord = useCallback(() => {
        let c = 1
        const board = []
        for(let row=0; row<11; row++){
            const currentRow = []
            for(let col=0; col<11; col++) currentRow.push(c++)
            board.push(currentRow)
        }
        return board
    }, [])

    const invadersFill = useCallback(() => {
        const invaders = []
        for(let i=1; i<34; i++) invaders.push(i)
        return invaders
    }, [])

    const board = createBord()
    const [tank, setTank] = useState(116)
    const [invaders, setInvaders] = useState(invadersFill())
    const [tankShot, setTankShot] = useState(false)
    const [shotPlace, setShotPlace] = useState(0)

    const invadersCheck = (cell) => { return invaders.includes(cell)}

    const moveTank = (e) => {
        if(e.key === 'ArrowRight' && tank < 121) setTank(tank+1)
        else if(e.key === 'ArrowLeft' && tank > 111) setTank(tank-1)
        else if(e.key === 'ArrowUp'){ 
            setTankShot(true)
            setShotPlace(tank-11)
        }
    }

    const removeInvader = useCallback(() => {
        setInvaders(i => i.filter((invader) => shotPlace != invader)) 
    }, [shotPlace])

    const moveInvaders = useCallback(() => {
        setInvaders((i) => {
            if (i[i.length - 1] < 109) {
                return i.map((invader) => invader + 11);
            } else {
                return invadersFill();
            }
        });
    }, [invadersFill]);

    const moveShot = useCallback(() => {
        if(tankShot){
            setShotPlace((s) => s-11)
            if(invaders.includes(shotPlace) || shotPlace < 11){ 
                removeInvader()
                setTankShot(false)
                setShotPlace(0)
            }
        }
        winCheck()
    }, [tankShot, shotPlace, invaders, removeInvader])

    const winCheck = useCallback(() => {
        if(invaders.length === 0) setWin(true)
    }, [invaders.length, setWin])

    useEffect(() =>{
        const moveInvadersInterval = setInterval (moveInvaders, 1700)
         return () => clearInterval(moveInvadersInterval)
    },[moveInvaders])

    useEffect(()=>{
        const moveShotInterval = setInterval(moveShot , 10)
        return () => clearInterval(moveShotInterval)
    },[moveShot])
    
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
    )
}