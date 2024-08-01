import React, { useEffect, useState, useRef } from "react"
import './stopWatch.css'

export default function StopWatch({ run, win, setScore, score }){
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalRef = useRef(null)
    const startRef = useRef(0)

    useEffect(() =>{
        start()
        format()
        if(run){
           intervalRef.current =  setInterval(() =>{
            setElapsedTime(Date.now() - startRef.current)
            }, 10)
        }
        return () => { clearInterval(intervalRef.current) }
    }, [])

    const start = () =>{
        if(run)
          startRef.current = Date.now() - elapsedTime
    }

    const reset = () =>{
        setElapsedTime(0)
        run = false
    }

    const zero = (n) => {
        if(n < 10) return "0"+n
        return n
    }

    const format = () => {
        let time = {
            m: Math.floor(elapsedTime / (1000 * 60) % 60),
            s: Math.floor(elapsedTime / (1000) % 60),
            ms: Math.floor(elapsedTime % 1000 / 100)
        }
        return `${ zero(time.m) }:${ zero(time.s) }:${ zero(time.ms) }`
    }

    if(win){
        run = false
        setScore({ ...score, time: format() })
    }    

    return(
      <div className="watch-display">
        { format() }
      </div>
    )
}