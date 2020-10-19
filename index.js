const scoreDisplay = document.getElementById('score');
const applesEatDisplay = document.getElementById('applesEat');
const grid = document.getElementById('snakeDisplay');

function displayGrid() {
    for (let numOfSquares = 0; numOfSquares < 100; numOfSquares++) {
        let square = document.createElement('div');
        square.textContent = numOfSquares;
        square.classList.add('square')
        grid.appendChild(square);
    }
}

displayGrid();