const boardContainer = document.querySelector('gameboard');
const chooseMark = document.querySelector('.x-or-o');
let turnCount = 0;

const gameBoard = (function () {
  let board = [null, null, null, null, null, null, null, null, null];

  (createBoard = function () {
    for (let i = 0; i < board.length; i++) {
      const boardCell = document.createElement('div');
      boardCell.className = 'board-cell';
      boardCell.setAttribute('data-index', i);

      boardContainer.append(boardCell);
      displayTurn();
    }
  })();

  return {
    get: function () {
      return board;
    },
    setCell: (index, marker) => {
      board[index] = marker;
    },
    checkBoard: () => {
      //check columns for winner
      if (
        (board[0] != null && board[0] === board[3] && board[3] === board[6]) ||
        (board[1] != null && board[1] === board[4] && board[4] === board[7]) ||
        (board[2] != null && board[2] === board[5] && board[5] === board[8]) ||
        (board[0] != null && board[0] === board[1] && board[1] === board[2]) ||
        (board[3] != null && board[3] === board[4] && board[4] === board[5]) ||
        (board[6] != null && board[6] === board[7] && board[7] === board[8]) ||
        (board[0] != null && board[0] === board[4] && board[4] === board[8]) ||
        (board[2] != null && board[2] === board[4] && board[4] === board[6])
      ) {
        return player.turn ? -1 : 1;
      } else {
        return 0;
      }
    },
    make: function () {
      board = [null, null, null, null, null, null, null, null, null];
      boardContainer.innerHTML = '';
      turnCount = 0;
      if (player.mark === 'x') player.turn = true;
      if (playerAI.mark === 'x') playerAI.turn = true;
      if (player.mark === 'o') player.turn = false;
      if (playerAI.mark === 'o') playerAI.turn = false;
      createBoard();
    },
  };
})();

chooseMark.showModal();

function createPlayer() {
  return {
    _mark: null,
    _turn: false,
    get mark() {
      return this._mark;
    },
    set mark(value) {
      this._mark = value;
    },
    get turn() {
      return this._turn;
    },
    set turn(value) {
      this._turn = value;
    },
    takeTurn: function (target) {
      target.textContent = this._mark;
    },
  };
}

const player = createPlayer();
const playerAI = createPlayer();

const playasX = document.querySelector('.x');
playasX.addEventListener('click', () => {
  player.mark = 'x';
  player.turn = true;
  playerAI.mark = 'o';
  chooseMark.close();
  chooseMark.style.display = 'none';

  gameBoard.make();
});
const playasO = document.querySelector('.o');
playasO.addEventListener('click', () => {
  player.mark = 'o';
  playerAI.mark = 'x';
  playerAI.turn = true;
  chooseMark.close();
  chooseMark.style.display = 'none';

  gameBoard.make();

  aiTakeTurn();
});

boardContainer.addEventListener('click', (e) => {
  const root = document.querySelector('body');
  const CompStyle = getComputedStyle(root);
  const borderColor = CompStyle.getPropertyValue('--accent');

  if (
    e.target.classList.contains('board-cell') &&
    !e.target.classList.contains('marked') &&
    gameBoard.checkBoard() === 0 &&
    player.turn
  ) {
    player.takeTurn(e.target);
    e.target.classList.add(`${player.mark}-mark`);
    e.target.classList.add('marked');
    turnCount++;
    e.target.style.borderColor = borderColor;
    // change value of board array
    const index = e.target.getAttribute('data-index');
    gameBoard.setCell(index, player.mark);
    displayTurn();
    showResult();
    player.turn = false;
    playerAI.turn = true;
  }

  aiTakeTurn();
});

function aiTakeTurn() {
  setTimeout(() => {
    if (playerAI.turn && gameBoard.checkBoard() == 0) {
      const boardCells = document.querySelectorAll('.board-cell');

      for (let i = 0; i < boardCells.length; i++) {
        const boardCell = boardCells[i];
        const index = boardCell.getAttribute('data-index');

        if (gameBoard.get()[index] === null) {
          turnCount++;
          playerAI.takeTurn(boardCell); // Pass the boardCell as an argument
          gameBoard.setCell(index, playerAI.mark);
          boardCell.classList.add(`${player.mark}-mark`);
          boardCell.classList.add('marked');
          displayTurn();
          showResult();
          playerAI.turn = false;
          player.turn = true;

          break; // Exit the loop after making a move
        }
      }
    }
  }, 400);
}

function displayTurn() {
  const currentTurn = document.querySelector('.current-turn');
  const root = document.querySelector('body');
  const CompStyle = getComputedStyle(root);
  const borderColor = CompStyle.getPropertyValue('--accent');

  if (turnCount % 2 == 0) {
    currentTurn.textContent = 'X';
  } else {
    currentTurn.textContent = 'O';
  }
  currentTurn.style.fontColor = borderColor;
}

const modal = document.querySelector('.for-winner');

const playAgainBtn = document.querySelector('.for-winner button');
playAgainBtn.addEventListener('click', () => {
  modal.close();
  chooseMark.showModal();
  chooseMark.style.display = 'grid';

  aiTakeTurn();
});

function showResult() {
  if (gameBoard.checkBoard() != 0) {
    //WIN
    modal.showModal();
    const winner = document.querySelector('.for-winner p');
    if (playerAI.turn) winner.textContent = 'u lost? ಠ ʖ̯ ͡ಠ';
    if (player.turn) winner.textContent = 'Player wins!';
  }
  if (gameBoard.checkBoard() == 0 && turnCount == 9) {
    //TIE
    modal.showModal();
    const result = document.querySelector('.for-winner p');
    result.textContent = "It's a tie!";
  }
}
