const columns = 8;
const rows = 8;
let mineCounter = 10;
let time;
let startClick = false;
let finishGame = false;

addEventClick();

document.addEventListener("DOMContentLoaded", () =>  {
    startGame();
});

function startGame() {
    if (window.location.search.includes("?")) {
        board = createBoardFromMockData(mockData);
        generateTable(board.length, board[0].length);
        addEventClick();
      } else {
        board = createBoard(columns, rows);
        generateTable(columns, rows);
        setRandomMines();
        addEventClick();
    }
}

function addEventClick() {
  //var cell = document.createElement("td");
  let cells = document.getElementsByTagName("td");

  for (const elements of cells) {
    elements.addEventListener("click", () => {
      uncoverCell(elements.getAttribute("id"));
      win();
    });
  }
  for (const elements of cells) {
    elements.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      taggedCell(elements.getAttribute("id"));
    });
  }

  document.getElementById("face").addEventListener("click", () => {
    resetGame();
});
}

function resetGame() {
    startGame();
    clearInterval(time);
    startClick = false;
    finishGame = false;
    document.getElementById("time-counter").innerText = "Time counter: 0";
    mineCounter = 10;
    document.getElementById("mine-counter").innerText = "Mine counter: 10";
    document.getElementById("face").setAttribute("src", "/img/normal_face.png");

}

function setTime() {
  startClick = true;
  let second = 1;
  time = window.setInterval(function () {
    document.getElementById("time-counter").innerHTML =
      "Time Counter: " + second;
    second++;
  }, 1000);
}

function taggedCell(cellId) {
  let cell = document.getElementById(cellId);
  if (!finishGame) {
    if (!startClick) {
      setTime();
    }

    let cellTag = setUserTag(cellId);
    console.log(cellTag);

    if (cellTag == "!") {
      cell.classList.add("minetag");
      mineCounter--;
    }
    if (cellTag == "?") {
      cell.classList.remove("minetag");
      cell.innerText = "?";
      mineCounter++;
    }
    if (cellTag == "") {
        console.log("entra");
      cell.innerText = "";

    }
  } else {
    cell.innerText = "";
    cell.classList.add("minetag");
  }
  document.getElementById("mine-counter").innerHTML =
    "Mine Counter: " + mineCounter;
}

function uncoverCell(cellId) {
  if (!startClick) {
    setTime();
  }
  let cell = document.getElementById(cellId);
  let row = cellId[0];
  let column = cellId[2];
  board[row][column].isRevealed = true;
  showCell(cellId);

  cell.classList.add("celluncovered");
  cell.classList.remove("cellcovered");
}

function coverCell(cellId) {
  let cell = document.getElementById(cellId);
  cell.classList.add("cellcovered");
  cell.classList.remove("celluncovered");
}

function showCell(cellId) {
  console.log(board);
  let cells = document.getElementById(cellId);
  let row = cellId[0];
  let column = cellId[2];

  if (board[row][column].isMine == true) {
    cells.classList.add("mine");
    defeat(cellId);
  } else {
    let minesaround = minesAround(row, column);
    if (minesaround != 0) {
      board[row][column].isRevealed = true;
      cells.innerText = minesaround;
    } else {
      cells.classList.add("celluncovered");
      board[row][column].isRevealed = true;
      showSurroundedCells(row, column);
    }
  }
}

function showSurroundedCells(row, column) {
  row = parseInt(row);
  column = parseInt(column);

  if (column < board[row].length - 1) {
    if (board[row][column + 1].isRevealed == false)
      document.getElementById(row + "-" + (column + 1)).click();
  }

  if (column > 0) {
    if (board[row][column - 1].isRevealed == false)
      document.getElementById(row + "-" + (column - 1)).click();
  }

  if (row > 0) {
    if (board[row - 1][column].isRevealed == false)
      document.getElementById(row - 1 + "-" + column).click();

    if (column < board[row].length - 1) {
      if (board[row - 1][column + 1].isRevealed == false)
        document.getElementById(row - 1 + "-" + (column + 1)).click();
    }
    if (column > 0) {
      if (board[row - 1][column - 1].isRevealed == false)
        document.getElementById(row - 1 + "-" + (column - 1)).click();
    }
  }
  if (row < board.length - 1) {
    if (board[row + 1][column].isRevealed == false)
      document.getElementById(row + 1 + "-" + column).click();

    if (column > 0) {
      if (board[row + 1][column - 1].isRevealed == false)
        document.getElementById(row + 1 + "-" + (column - 1)).click();
    }

    if (column < board[row].length - 1) {
      if (board[row + 1][column + 1].isRevealed == false)
        document.getElementById(row + 1 + "-" + (column + 1)).click();
    }
  }
}

function defeat() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j].isMine == true) {
        if (board[i][j].isRevealed == false) {
          let cells = document.getElementById(i + "-" + j);
          cells.classList.add("mine");
          cells.classList.add("celluncovered");
          cells.classList.remove("cellcovered");
        }
      }
    }
  }
  clearInterval(time);
  document.getElementById("face").setAttribute("src", "/img/sad_face.png");
}

function win() {
  let win = isWin();

  if (win) {
    finishGame = true;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j].isMine == true) {
          taggedCell(i + "-" + j);
        }
      }
    }
    document.getElementById("face").setAttribute("src", "/img/happy_face.png");
    clearInterval(time);
  }
}

//Tabla sin mockdata, 8x8
function generateTable(height, width) {
  var table = document.getElementById("board-inside-content");
  table.innerHTML = "";
  for (let i = 0; i < height; i++) {
    var row = document.createElement("tr");
    row.setAttribute("id", "row:" + i);
    for (let j = 0; j < width; j++) {
      var cell = document.createElement("td");
      var id = i + "-" + j;
      var classCell = "cellcovered";
      cell.classList.add(classCell);
      cell.setAttribute("id", id);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}
