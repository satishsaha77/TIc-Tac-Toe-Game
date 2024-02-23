document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Create the Tic-Tac-Toe board dynamically
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  
    resetBtn.addEventListener('click', resetGame);
  
    function handleCellClick(event) {
      const index = event.target.dataset.index;
  
      if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) {
          status.textContent = `Player ${currentPlayer} wins!`;
          gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
          status.textContent = 'It\'s a draw!';
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    }
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
      });
    }
  
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
  
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.textContent = '';
      });
    }
  });
  