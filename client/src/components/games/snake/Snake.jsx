import React, { useState, useEffect } from 'react'
import { arrowKey, gameTitle, keyDown } from './Const'
import './snake.css'

export default function SnakeGame({ setWinGame }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 0, y: -1 })
  const [gameOver, setGameOver] = useState(false)

  const moveSnake = () => {
    setSnake((prev) => {
      const newSnake = [...prev]
      const head = { ...newSnake[0] }
      head.x += direction.x
      head.y += direction.y
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        })
      } else newSnake.pop()
      if (head.x < 0 || head.x >= 24 || head.y < 0 || head.y >= 24 ||
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)){
        setGameOver(true)
        return prev
      }
      newSnake.unshift(head)
      return newSnake
    })
    if(snake.length === 6) setWinGame(true)
  }

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 15, y: 15 })
    setDirection({ x: 0, y: -1 })
    setGameOver(false)
  }
  
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === arrowKey.up && direction.y === 0)
          setDirection({ x: 0, y: -1 })
        else if (e.key === arrowKey.down && direction.y === 0) 
          setDirection({ x: 0, y: 1 })
        else if (e.key === arrowKey.left && direction.x === 0) 
          setDirection({ x: -1, y: 0 })
        else  if (e.key === arrowKey.right && direction.x === 0) 
          setDirection({ x: 1, y: 0 })
    }
    window.addEventListener(keyDown, handleKeyDown)
    return () => { window.removeEventListener(keyDown, handleKeyDown) }
  }, [direction])

  useEffect(() => {
    if (gameOver) restartGame()
    const move = setInterval(moveSnake, 100)
    return () => clearInterval(move)
  }, [snake, direction, food, gameOver])

  return (
    <div className='snake'>
      <h1>{ gameTitle }</h1>
      <div className='board'>
        {snake.map((segment, index) => (
          <div
            key={ index }
            className="snake-segment"
            style={{ left: `${ segment.x * 20 }px`, top: `${ segment.y * 20 }px` }}
          />
        ))}
        <div
          className="food"
          style={{ left: `${ food.x * 20 }px`, top: `${ food.y * 20 }px` }}
        />
      </div>
    </div>
  )
}