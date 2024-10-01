const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Crea el tablero
function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

// Maneja el clic en una celda
function handleCellClick(index) {
    if (gameState[index] || checkWinner()) return;

    gameState[index] = currentPlayer;
    saveGame(); // Guarda el estado después de cada movimiento
    updateBoard();

    if (checkWinner()) {
        message.textContent = `¡Jugador ${currentPlayer} gana!`;
    } else if (gameState.every(cell => cell)) {
        message.textContent = '¡Empate!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Actualiza el tablero visualmente
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameState[index];
    });
}

// Verifica si hay un ganador
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Guarda el estado del juego en localStorage
function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    localStorage.setItem('currentPlayer', currentPlayer);
}

// Carga el estado guardado al iniciar
function loadGame() {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    const savedCurrentPlayer = localStorage.getItem('currentPlayer');

    if (savedGameState) {
        gameState = savedGameState;
        currentPlayer = savedCurrentPlayer || 'X';
        updateBoard();
    }
}

// Reinicia el juego
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    message.textContent = '';
    saveGame(); // Guarda el estado al reiniciar
    updateBoard();
}

// Eventos
resetButton.addEventListener('click', resetGame);
window.addEventListener('load', loadGame); // Carga el juego al iniciar
createBoard();

