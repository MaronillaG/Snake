// animation loop for game.
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'

import { update as updateFood, draw as drawFood} from './food.js'

import {outsideGrid} from './grid.js'

let lastRenderTime = 0; 
const gameArea = document.getElementById('game-area');
let gameOver = false; // when true game terminates.

//paint function keeps running till gameover
function paint(currentTime) {
   if (gameOver) {
    if (confirm('You lost. Press ok to restart. ')) {
        window.location = '/';
    }
    return;
   }

   window.requestAnimationFrame(paint);
   const secondsSinceLastRender = (currentTime - lastRenderTime ) / 1000;
   if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    
    console.log('Render')
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(paint); // starts the loop

function update() {
    updateSnake();
    updateFood();
    isGameOver();
}

function draw () {
    drawSnake(gameArea);
    drawFood(gameArea);
}

function isGameOver() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

const modal = document.getElementById("game-over-message");
const openModal = document.querySelector
const closeModal = document.getElementById("close-btn");