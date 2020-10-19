const scoreDisplay = document.getElementById('score');
const applesEatDisplay = document.getElementById('applesEat');
const grid = document.getElementById('snakeDisplay');
let score  = 0;
let applesEat = 0;
let squares = [];
let snake = [];
let direction = 1;
let timerId = 0;
let tail = 0;

function displayGrid() {
    for (let numOfSquares = 0; numOfSquares < 100; numOfSquares++) {
        let square = document.createElement('div');
        square.classList.add('square')
        grid.appendChild(square);
        squares.push(square)
    }
    displaySnake();
    timerId = setInterval(move,1000);
}

function displaySnake() {
    let randomSnakeVal = Math.floor(Math.random() * 100);
    if ((randomSnakeVal % 10) >= 7) {
        randomSnakeVal = randomSnakeVal - 3;
    }
    snake.push(randomSnakeVal, randomSnakeVal+1, randomSnakeVal+2);
    snake.reverse();
    snake.forEach(element => {
        squares[element].classList.add('snake');
    });
}

function move() {
        if(
            snake[0] % 10 === 9 && direction === 1 ||
            snake[0] % 10 === 0 && direction === -1 ||
            snake[0] + 10 > 99 && direction === 10 ||
            snake[0] - 10 < 0 && direction === -10 ||
            squares[snake[0] + direction].classList.contains('snake')
        )
            {
            clearInterval(timerId);
        } else {
                console.log(snake)
                tail = snake.pop();
                squares[tail].classList.remove('snake');
                snake.unshift((snake[0] + direction));
                squares[snake[0]].classList.add('snake');
        } 
}

displayGrid();

document.addEventListener('keyup',function(e) {
    console.log(e.code);
    if (e.code === 'ArrowUp') {
        direction = -10;
    } else if(e.code === 'ArrowDown') {
        direction = 10;
    } else if(e.code === 'ArrowLeft') {
        direction = -1;
    } else if(e.code === 'ArrowRight') {
        direction = 1;
    }
})