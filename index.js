const scoreDisplay = document.getElementById('score');
const applesEatDisplay = document.getElementById('applesEat');
const grid = document.getElementById('snakeDisplay');
let score  = 0;
let applesEat = 0;
let squares = [];
let snake = [];

function displayGrid() {
    for (let numOfSquares = 0; numOfSquares < 100; numOfSquares++) {
        let square = document.createElement('div');
        square.classList.add('square')
        // square.textContent = numOfSquares
        grid.appendChild(square);
        squares.push(square)
    }
    displaySnake();
}

function displaySnake() {
    let randomSnakeVal = Math.floor(Math.random() * 100);
    if ((randomSnakeVal % 10) >= 7) {
        randomSnakeVal = randomSnakeVal - 3;
    }
    snake.push(randomSnakeVal, randomSnakeVal+1, randomSnakeVal+2);
    snake.forEach(element => {
        squares[element].classList.add('snake');
    });
}

displayGrid();