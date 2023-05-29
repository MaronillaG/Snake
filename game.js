import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0; 
let gameOver = false; // when true game terminates.
let startMsg = document.getElementById('start-msg');
let modalContainer = document.getElementById('modal-container'); // popup GMAE OVER
let closeBtn = document.getElementById('close-btn'); // the x = close modal
let body = document.querySelector('body');
const gameArea = document.getElementById('game-area');
let replay = document.getElementById('restart-btn');  // button for new game = refresh

//paint function keeps running till gameover
function paint(currentTime) {
   if (gameOver) {
       modalContainer.style.display = 'block';
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
    checkDeath();
}

function draw () {
    drawSnake(gameArea);
    drawFood(gameArea);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


function firstKeyPress(event) {
    document.removeEventListener('keydown', firstKeyPress);
    startMsg.style.display = 'none';
}
// Event Listeners
document.addEventListener('keydown', firstKeyPress);

closeBtn.addEventListener('click', function() {
    modalContainer.style.display = 'none';
})


replay.addEventListener('click', function() {
    modalContainer.style.display = 'none';
    window.location.reload();
})
