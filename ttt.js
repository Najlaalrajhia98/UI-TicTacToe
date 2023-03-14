const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

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

const handleCellClick = function(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !isGameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

const handleRestartGame = function() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  message.innerText = '';

  cells.forEach(cell => {
    cell.innerText = '';
    cell.removeAttribute('data-cell-value');
    cell.classList.remove('cell--x');
    cell.classList.remove('cell--o');
  });
  
  board.classList.remove('animated-pink');
  board.offsetWidth; // Force reflow
  board.classList.add('animated-pink');
};

const handleCellPlayed = function(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(`cell--${currentPlayer.toLowerCase()}`);
  clickedCell.setAttribute('data-cell-value', currentPlayer);
};

const handleResultValidation = function() {
  let roundWon = false;
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const positionA = gameState[a];
    const positionB = gameState[b];
    const positionC = gameState[c];
    if (positionA === '' || positionB === '' || positionC === '') {
      continue;
    }
    if (positionA === positionB && positionB === positionC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.innerText = `${currentPlayer} has won!`;
    isGameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    message.innerText = 'Draw!';
    isGameActive = false;
    return;
  }

  handlePlayerChange();
};

const handlePlayerChange = function() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.innerText = `${currentPlayer}'s turn`;
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', handleRestartGame);
