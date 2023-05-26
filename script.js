const boardContainer = document.querySelector('gameboard');

const gameBoard = (function () {
  let board = [null, null, null, null, null, null, null, null, null];
  boardContainer.innerHTML = '';

  for (let i = 0; i < board.length; i++) {
    const boardCell = document.createElement('div');
    boardCell.className = 'board-cell';
    boardCell.setAttribute('data-index', i);

    boardContainer.append(boardCell);
  }

  return {
    setCell: (index, marker) => {
      board[index] = marker;
    },
    checkBoard: () => {
      //check columns for winner
      if (board[0] != null && board[0] === board[3] && board[3] === board[6]) {
        return board[0];
      }
      if (board[1] != null && board[1] === board[4] && board[4] === board[7]) {
        return board[1];
      }
      if (board[2] != null && board[2] === board[5] && board[5] === board[8]) {
        return board[2];
      }
      //check rows for winner
      if (board[0] != null && board[0] === board[1] && board[1] === board[2]) {
        return board[0];
      }
      if (board[3] != null && board[3] === board[4] && board[4] === board[5]) {
        return board[3];
      }
      if (board[6] != null && board[6] === board[7] && board[7] === board[8]) {
        return board[6];
      }
      //check diagonally for winner
      if (board[0] != null && board[0] === board[4] && board[4] === board[8]) {
        return board[0];
      }
      if (board[2] != null && board[2] === board[4] && board[4] === board[6]) {
        return board[2];
      }
    },
    make: function () {
      board = [null, null, null, null, null, null, null, null, null];
      boardContainer.innerHTML = '';
      turnCount = 0;

      for (let i = 0; i < board.length; i++) {
        const boardCell = document.createElement('div');
        boardCell.className = 'board-cell';
        boardCell.setAttribute('data-index', i);

        boardContainer.append(boardCell);
      }
    },
  };
})();

function createPlayer(mark) {
  return {
    mark: mark,
    turn: function () {
      this.textContent = mark;
    },
  };
}

const playerX = createPlayer('x');
const playerO = createPlayer('o');
let turnCount = 0;

const root = document.querySelector('body');
const CompStyle = getComputedStyle(root);
const xColor = CompStyle.getPropertyValue('--accent');
const oColor = CompStyle.getPropertyValue('--primary');

const currentTurn = document.querySelector('.current-turn');

boardContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('board-cell') &&
    !e.target.classList.contains('marked') &&
    gameBoard.checkBoard() == null
  ) {
    if (turnCount % 2 === 0) {
      playerO.turn.call(e.target);
      e.target.classList.add('o-mark');
      e.target.classList.add('marked');
      turnCount++;
      //turn display
      e.target.style.borderColor = xColor;
      currentTurn.textContent = 'X';
      currentTurn.style.fontColor = xColor;
      // change value of board array
      const index = e.target.getAttribute('data-index');
      gameBoard.setCell(index, 'o');
    } else {
      playerX.turn.call(e.target);
      e.target.classList.add('x-mark');
      e.target.classList.add('marked');
      e.target.style.borderColor = xColor;
      turnCount++;
      //turn display
      e.target.style.borderColor = oColor;
      currentTurn.textContent = 'O';
      currentTurn.style.fontColor = oColor;
      // change value of board array
      const index = e.target.getAttribute('data-index');
      gameBoard.setCell(index, 'x');
    }
  }

  showResult();
});

const modal = document.querySelector('dialog');
function showResult() {
  const player = gameBoard.checkBoard();
  if (gameBoard.checkBoard() != null) {
    //WIN
    modal.showModal();
    const winner = document.querySelector('dialog p');
    winner.textContent = `${player.toUpperCase()} wins!`;
  }
  if (gameBoard.checkBoard() == null && turnCount == 9) {
    //TIE
    modal.showModal();
    const result = document.querySelector('dialog p');
    result.textContent = "It's a tie!";
  }
}

const playAgainBtn = document.querySelector('dialog button');
playAgainBtn.addEventListener('click', () => {
  gameBoard.make();
  modal.close();
});
