const columns = 8;
const rows = 8;
let mineCounter = 10;

const mineField = [];
minefieldCreation();
generateTable();

//Características de cada casilla (Tablero)
function minefieldCreation(){
  for (let i = 0; i < columns; i++){
      mineField.push([])
          for (let j = 0; j < rows; j++){
              mineField[i].push({
                  mine:false, //mineCounter? 
                  hidden:true,
                  num:null
              })
          }
  }
  
}

function initGame() {
    let parametersURL = getURLParams('mockdata');
    let rows = parametersURL.length;
    let cols = parametersURL[0].length;
    minefieldCreation(rows, cols);
}

function getURLParams(){
   // Fichero mockdatahelper?

}


//Tabla sin mockdata, 8x8
function generateTable(){
  var table = document.getElementById("board-inside-content");
  for (let i = 0; i <= columns; i++){
      var row = document.createElement("tr");
      row.setAttribute("id","row:"+i);
      for (let j = 0; j <= rows; j++){
          var cell = document.createElement("td");
          var id = "cell:"+i+j;
          var classCell= "cell";
          cell.classList.add(classCell);
          cell.setAttribute("id",id);
          row.appendChild(cell);
      }
      table.appendChild(row);
  }
}

