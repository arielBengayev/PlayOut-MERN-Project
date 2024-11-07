export const gameTitle = 'snake game'
export const winCondition = 6
export const keyDown = 'keydown'
export const newPlace = 20
export const moveIntervalTime = 70
export const noMovement = 0
export const wall = {
    top: 0,
    bottom: 22,
    left: 0,
    right: 24
}
export const snakeMove = {
    up: { x: 0, y: -1 }, 
    down: { x: 0, y: 1 }, 
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 } 
}
export const startPlace = {
    snake: { x: 10, y: 10 },
    food: { x: 15, y: 15 },
    direction: snakeMove.up
}
export const arrowKey = { 
    up: 'ArrowUp', 
    down: 'ArrowDown', 
    left: 'ArrowLeft',
    right: 'ArrowRight' 
}