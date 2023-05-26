const boardContainer = document.querySelector('gameboard');

const gameBoard = (function () {
  let board = [null, null, null, null, null, null, null, null, null];

  for (let i = 0; i < board.length; i++) {
    const boardCell = document.createElement('div');
    boardCell.className = 'board-cell';
    boardCell.setAttribute('data-index', i);

    boardContainer.append(boardCell);
  }
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
let turnCount = 1;

boardContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('board-cell') &&
    !e.target.classList.contains('marked')
  ) {
    if (turnCount % 2 === 0) {
      playerO.turn.call(e.target);
      e.target.classList.add('o-mark');
      e.target.classList.add('marked');
      turnCount++;
    } else {
      playerX.turn.call(e.target);
      e.target.classList.add('x-mark');
      e.target.classList.add('marked');
      turnCount++;
    }
  }
});
