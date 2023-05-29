import { onSnake, expandSnake} from './snake.js'
import { randomGridPosition } from './grid.js'
    
let food = getRandomFoodPosition(); // starting x/y grid co-ordinates of food element
const EXPANSION_RATE = 1;

export  function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition(); // updates food element to random x/y grid co-ordinates
    }
}

export function draw(gameArea) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);

}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

