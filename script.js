const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let cells = Array(9).fill(null);
let currentPlayer = '〇';
let gameOver = false;

function checkWinner() {
  for (const [a, b, c] of WIN_LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function render() {
  boardEl.innerHTML = '';
  cells.forEach((value, index) => {
    const cellEl = document.createElement('div');
    cellEl.className = 'cell';
    cellEl.textContent = value ?? '';
    cellEl.addEventListener('click', () => handleCellClick(index));
    boardEl.appendChild(cellEl);
  });
}

function handleCellClick(index) {
  if (gameOver || cells[index]) return;

  cells[index] = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    statusEl.textContent = `${winner} の勝ち!`;
    gameOver = true;
  } else if (cells.every((c) => c)) {
    statusEl.textContent = '引き分け';
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === '〇' ? '×' : '〇';
    statusEl.textContent = `${currentPlayer} のターン`;
  }

  render();
}

function reset() {
  cells = Array(9).fill(null);
  currentPlayer = '〇';
  gameOver = false;
  statusEl.textContent = `${currentPlayer} のターン`;
  render();
}

resetBtn.addEventListener('click', reset);

reset();
