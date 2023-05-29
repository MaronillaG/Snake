import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10; // renders game area x times a second

// the snake body is an array of objects. each unit of the snake is one object.
// each object contains the cordinates, x/y properties
// which references co-ordinates in the game area or grid

const snakeBody = [ {x: 5, y: 5}]; // starting position of snake head.  

let newUnit = 0;

export function update () {
    growBody();
    console.log('Update Snake')
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length -2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
}

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw (gameArea) { // 
    console.log('draw snake')
    gameArea.innerHTML = '';
    snakeBody.forEach(unit => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = unit.y
        snakeElement.style.gridColumnStart = unit.x
        snakeElement.classList.add('snake')
        gameArea.appendChild(snakeElement)
    })
}

export function expandSnake(nUnit) {
    newUnit =+ nUnit;
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((unit,index) => {
        if (ignoreHead && index === 0 ) return false;
        return equalPositions(unit, position)
    });
}


function growBody() {
    for (let i = 0; i < newUnit; i++) {
        snakeBody.push( {...snakeBody[snakeBody.length - 1] });
    }
    
    newUnit = 0;
}
export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return  (pos1.x === pos2.x && pos1.y === pos2.y);
}