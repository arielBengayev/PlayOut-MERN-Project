import React, { useState, useEffect } from 'react'
import { arrowKey, gameTitle, keyDown, moveIntervalTime, newPlace, noMovement, snakeMove, startPlace, wall, winCondition } from './Const'
import './snake.css'

export default function SnakeGame({ setWinGame }) {
  const [snake, setSnake] = useState([startPlace.snake])
  const [food, setFood] = useState(startPlace.food)
  const [direction, setDirection] = useState(startPlace.direction)
  const [gameOver, setGameOver] = useState(false)

  const moveSnake = () => {
    setSnake((prev) => {
      const newSnake = [...prev]
      const head = { ...newSnake[0] }
      head.x += direction.x
      head.y += direction.y
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random()*wall.right),
          y: Math.floor(Math.random()*wall.bottom),
        })
      } else newSnake.pop()
      if (head.x < wall.left || head.x >= wall.right || head.y < wall.top || head.y >= wall.bottom ||
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)){
        setGameOver(true)
        return prev
      }
      newSnake.unshift(head)
      return newSnake
    })
    if(snake.length === winCondition) setWinGame(true)
  }

  const restartGame = () => {
    setSnake([startPlace.snake])
    setFood(startPlace.food)
    setDirection(startPlace.direction)
    setGameOver(false)
  }
  
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === arrowKey.up && direction.y === noMovement)
          setDirection(snakeMove.up)
        else if (e.key === arrowKey.down && direction.y === noMovement) 
          setDirection(snakeMove.down)
        else if (e.key === arrowKey.left && direction.x === noMovement) 
          setDirection(snakeMove.left)
        else  if (e.key === arrowKey.right && direction.x === noMovement) 
          setDirection(snakeMove.right)
    }
    window.addEventListener(keyDown, handleKeyDown)
    return () => { window.removeEventListener(keyDown, handleKeyDown) }
  }, [direction])

  useEffect(() => {
    if (gameOver) restartGame()
    const move = setInterval(moveSnake, moveIntervalTime)
    return () => clearInterval(move)
  }, [snake, direction, food, gameOver])

  return (
    <div className='snake'>
      <h1 className='title'>{ gameTitle }</h1>
      <div className='board'>
        {snake.map((segment, index) => (
          <div
            key={ index }
            className="snake-segment"
            style={{ 
              left: `${ segment.x * newPlace }px`, 
              top: `${ segment.y * newPlace }px` 
            }}
          />
        ))}
        <div
          className="food"
          style={{ 
            left: `${ food.x * newPlace }px`, 
            top: `${ food.y * newPlace }px` 
          }}
        />
      </div>
    </div>
  )
}