import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './snake.css'

export default function SnakeGame({win, setWin}) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 0, y: -1 })
  const [gameOver, setGameOver] = useState(false)
  const navigate = useNavigate()

  const moveSnake = () => {
    setSnake((prev) => {
      const newSnake = [...prev];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        });
      } else newSnake.pop();
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)){
        setGameOver(true);
        return prev;
      }
      newSnake.unshift(head);
      return newSnake;
    })
    if(snake.length === 2) setWin(true)
  }

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' && direction.y === 0) setDirection({ x: 0, y: -1 })
        else if (e.key === 'ArrowDown' && direction.y === 0) setDirection({ x: 0, y: 1 })
        else if (e.key === 'ArrowLeft' && direction.x === 0) setDirection({ x: -1, y: 0 })
        else  if (e.key === 'ArrowRight' &&direction.x === 0) setDirection({ x: 1, y: 0 })
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {window.removeEventListener('keydown', handleKeyDown)}
  }, [direction])

  useEffect(() => {
    if (gameOver) restartGame()
    const move = setInterval(moveSnake, 100);
    return () => clearInterval(move);
  }, [snake, direction, food, gameOver]);

  return (
    <div className="game-container">
        <div className="game-board">
          {snake.map((segment, index) => (
            <div
              key={index}
              className="snake-segment"
              style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
            />
          ))}
          <div
            className="food"
            style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }}
          />
        </div>
    </div>
  );
}