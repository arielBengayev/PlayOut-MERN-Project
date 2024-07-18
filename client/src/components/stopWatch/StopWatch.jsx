import React, {useEffect, useState, useRef} from "react"
import './stopWatch.css'

export default function StopWatch({run}){
    const [running, setRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalRef = useRef(null)
    const startRef = useRef(0)

    useEffect(() =>{
        start()
        format()
        if(running){
           intervalRef.current =  setInterval(() =>{
            setElapsedTime(Date.now() - startRef.current)
            }, 10)
        }
        return () => { clearInterval(intervalRef.current) }
    }, [running])

    const start = () =>{
        if(run){
            setRunning(true)
            startRef.current = Date.now() - elapsedTime
        }
    }

    const reset = () =>{
        setElapsedTime(0)
        setRunning(false)
    }

    const zero = (n) => {
        if(n < 10) return "0"+n
        return n
    }

    const format = () => {
        let m = Math.floor(elapsedTime / (1000 * 60) % 60)
        let s = Math.floor(elapsedTime / (1000) % 60)
        let ms = Math.floor(elapsedTime % 1000 / 100)
        return `${ zero(m) }:${ zero(s) }:${ zero(ms) }`
    }

    return(
      <div className="watch-display">
        { format() }
      </div>
    )
}