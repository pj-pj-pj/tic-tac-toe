const gameBoard = (function () {
  let board = [null, null, null, null, null, null, null, null, null];

  for (let i = 0; i < board.length; i++) {
    const boardContainer = document.querySelector('gameboard');

    const boardCell = document.createElement('div');
    boardCell.className = 'board-cell';
    boardCell.setAttribute('data-index', i);

    boardContainer.append(boardCell);
  }
})();
