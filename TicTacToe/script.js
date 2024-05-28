const game = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const statusDisplay = document.getElementById('statusDisplay');
const playerButton = document.getElementById('playerButton');
const aiButton = document.getElementById('aiButton');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let againstAI = null; 
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

playerButton.addEventListener('click', () => {
    setGameMode(false);
});

aiButton.addEventListener('click', () => {
    setGameMode(true);
});

function setGameMode(isAI) {
    againstAI = isAI;
    playerButton.classList.remove('active');
    aiButton.classList.remove('active');
    if (isAI) {
        aiButton.classList.add('active');
    } else {
        playerButton.classList.add('active');
    }
    resetGame();
}

function handleCellClick(e) {
    if (againstAI === null) {
        alert('Please select a game mode!');
        return;
    }

    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell)) {
        statusDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current Player: ${currentPlayer}`;

        if (againstAI && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500); // Delay AI move for better UX
        }
    }
}

function makeAIMove() {
    let availableCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell)) {
        statusDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusDisplay.textContent = "Current Player: X";
    currentPlayer = 'X';
    
    if (againstAI === null) {
        playerButton.classList.remove('active');
        aiButton.classList.remove('active');
    }
}