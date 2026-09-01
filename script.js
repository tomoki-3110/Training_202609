const BOARD_SIZE = 15;
const WIN_COUNT = 5;
const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1], [1, -1],
];

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let cells = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
let currentPlayer = '〇';
let gameOver = false;

function toIndex(row, col) {
  return row * BOARD_SIZE + col;
}

function inBounds(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function checkWinner(row, col) {
  const player = cells[toIndex(row, col)];
  if (!player) return null;

  for (const [dr, dc] of DIRECTIONS) {
    let count = 1;
    for (const sign of [1, -1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;
      while (inBounds(r, c) && cells[toIndex(r, c)] === player) {
        count++;
        r += dr * sign;
        c += dc * sign;
      }
    }
    if (count >= WIN_COUNT) return player;
  }
  return null;
}

function render() {
  boardEl.innerHTML = '';
  cells.forEach((value, index) => {
    const cellEl = document.createElement('div');
    cellEl.className = 'cell';
    if (value === '〇') cellEl.classList.add('o');
    if (value === '×') cellEl.classList.add('x');
    cellEl.textContent = value ?? '';
    cellEl.addEventListener('click', () => handleCellClick(index));
    boardEl.appendChild(cellEl);
  });
}

function handleCellClick(index) {
  if (gameOver || cells[index]) return;

  cells[index] = currentPlayer;
  const row = Math.floor(index / BOARD_SIZE);
  const col = index % BOARD_SIZE;

  const winner = checkWinner(row, col);
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
  cells = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
  currentPlayer = '〇';
  gameOver = false;
  statusEl.textContent = `${currentPlayer} のターン`;
  render();
}

resetBtn.addEventListener('click', reset);

reset();
