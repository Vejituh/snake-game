const scoreDisplay = document.getElementById('score');
const applesEatDisplay = document.getElementById('applesEat');
const grid = document.getElementById('snakeDisplay');
let score  = 0;
let applesEat = 0;
let squares = [];
let snake = [];
let direction = 1;
let timerId = 0;
let speed = 1000
let tail = 0;
let randomApple = 0
let gameRunning = false;

function displayGrid() {
    for (let numOfSquares = 0; numOfSquares < 100; numOfSquares++) {
        let square = document.createElement('div');
        square.classList.add('square')
        grid.appendChild(square);
        squares.push(square)
    }
    displaySnake();
    generateApple();
    timerId = setInterval(move,speed);
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
        } else if(squares[snake[0]].classList.contains('apple')){
            squares[snake[0]].classList.remove('apple')
            squares[snake[0]].classList.add('snake')
            squares[snake[0]+direction].classList.add('snake')
            snake.unshift((snake[0]+direction));
            squares[randomApple].textContent = '';
            clearInterval(timerId);
            speed = speed - 50;
            timerId = setInterval(move,speed);
            console.log(speed);
            generateApple();
        }else {
                tail = snake.pop();
                squares[tail].classList.remove('snake');
                snake.unshift((snake[0] + direction));
                squares[snake[0]].classList.add('snake');
        } 
}

function resetGame() {
        snake.forEach(element => {
        squares[element].classList.remove('snake');
        });
        snake = [];
        squares[randomApple].classList.remove('apple');
        score = 0;
        applesEat = 0;
        tail = 0;
        scoreDisplay.textContent = "0";
        applesEatDisplay.textContent = "0";
        squares[randomApple].textContent = '';
        squares[randomApple].classList.remove('apple');
        clearInterval(timerId);
}

function generateApple() {
    randomApple = Math.floor(Math.random() * 100);
    do {
        if(squares[randomApple].classList.contains('snake')){
            randomApple = Math.floor(Math.random() * 100);
        }
        squares[randomApple].textContent = '🍎';
        squares[randomApple].classList.add('apple');
    } while (squares[randomApple].classList.contains(!'apple'))
}

document.addEventListener('keyup',function(e) {
    if(e.code === 'Enter') {
        if (gameRunning){
            resetGame();
            displayGrid();
        }else {
            displayGrid();
            gameRunning = true;
        }
    }else if (e.code === 'ArrowUp') {
        direction = -10;
    } else if(e.code === 'ArrowDown') {
        direction = 10;
    } else if(e.code === 'ArrowLeft') {
        direction = -1;
    } else if(e.code === 'ArrowRight') {
        direction = 1;
    }
})