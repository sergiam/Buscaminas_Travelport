const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mockData = urlParams.get('mockData');
var board = [];

//Toni's functions for validating and creating the board from mock data
const createBoardFromMockData = (data) => {
    const board = []
    let mockBoard = data.split('-')
    mockBoard = mockBoard.map((row) => { return row.split('') })
    for (let row = 0; row < mockBoard.length; row += 1) {
      board.push([])
      for (let column = 0; column < mockBoard[0].length; column += 1) {
        board[row].push({
          y: row,
          x: column,
          isMineExploded: false,
          isRevealed: false,
          userTag: '',
          isWrongTagged: false,
          numberOfMinesAround: 0,
          isMine: (mockBoard[row][column] === '*')
        })
      }
    }
    return board
}


const createBoard = () => {
  const board = []

  for (let row = 0; row < rows; row += 1) {
    board.push([])
    for (let column = 0; column < columns; column += 1) {
      board[row].push({
        y: row,
        x: column,
        isRevealed: false,
        userTag: '',
        numberOfMinesAround: 0,
        isMine: false
      })
    }
  }
  return board
}

function isWin() {
  let win = true;

  for(let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j].isMine == false) {
        if (board[i][j].isRevealed == false) {
          win = false;
        }
      }
    }
  }
  return win;
}

function setUserTag(cellId) {
  
  let id = cellId.split("-");
  let row = id[0];
  let column = id[1];
  let userTag = board[row][column].userTag;
if (board[row][column].isRevealed == false) {
  if(board[row][column].userTag == '') {
    userTag = '!';
  }
  if(board[row][column].userTag == '!') {
    userTag = '?';
  }
  if(board[row][column].userTag == '?') {
    userTag = '';
  }
  board[row][column].userTag = userTag;
  return board[row][column].userTag; 
  
}
 
  
}

function setRandomMines() {
    for (let i = 0; i < 10; i++) {
      let row = Math.floor(Math.random() * 8);
      let column = Math.floor(Math.random() * 8);
      if (board[row][column].isMine == true) {
        i--;
      } else {
      board[row][column].isMine = true;
    }
  }
}

function minesAround(row,column) {
    let mines = 0;
    row = parseInt(row);
    column = parseInt(column);

  if (column < (board[row].length -1)) {
  
    if (board[row][(column + 1)].isMine == true) mines++;
  }
  
  if (column > 0) { 
    if (board[row][(column - 1)].isMine == true) mines++;
  }

  if (row > 0) {
    if (board[(row - 1)][(column)].isMine == true) mines++;

      if (column < (board[row].length -1)) {
        if (board[(row - 1)][(column + 1)].isMine == true) mines++;
      }
      if (column > 0) { 
        if (board[(row - 1)][(column - 1)].isMine == true) mines++;
      }
  } 
  if (row < board.length -1) {
    if (board[(row + 1)][column].isMine == true) mines++;

      if (column > 0) { 
        if (board[(row + 1)][(column - 1)].isMine == true) mines++;
      }

      if (column < (board[row].length -1)) {
        if (board[(row + 1)][(column + 1)].isMine == true) mines++;
    }
  }
  board[row][column].numberOfMinesAround = mines;
  return mines;
}