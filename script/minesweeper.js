const columns = 8;
const rows = 8;
const mineCounter = 10;

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const mockData = urlParams.get('mockData')
const mineField = [];

generateTable();
addEventClick();

/*
//Características de cada casilla (Tablero)
function minefieldCreation(){
  for (let i = 0; i < columns; i++){
      mineField.push([])
          for (let j = 0; j < rows; j++){
              mineField[i].push({
                  mine:false, //hay mina en dicha casilla, mineCounter? 
                  hidden:true, //oculta o revelada
                  num:null
              })
          }
  }
  
}
*/

function addEventClick() {
    //var cell = document.createElement("td");
    let cells = document.getElementsByTagName("td");
    for (const elements of cells) {
        elements.addEventListener('click', () => {
            uncoverCell(elements.getAttribute("id"));
        });
        elements.addEventListener('click', () => {
            showMine(elements.getAttribute("id"));
        });
    }

}

function uncoverCell(cellId) {
    let cell = document.getElementById(cellId);
    cell.classList.add("celluncovered");
    cell.classList.remove("cellcovered");
}

function coverCell(cellId) {
    let cell = document.getElementById(cellId);
    cell.classList.add("cellcovered");
    cell.classList.remove("celluncovered");
    
}

function showMine(cellId) {
        let cells = document.getElementById(cellId);
        cells.classList.add("mine");
    }

function getMockDataParams(){
   // Fichero mockdatahelper?
   let parametersURL = document.getElementById('text-mockdata-loader')
   let rows = parametersURL.length;
   let cols = parametersURL[0].length;
   minefieldCreation(rows, cols);
}


//Tabla sin mockdata, 8x8
function generateTable(){
  var table = document.getElementById("board-inside-content");
  for (let i = 0; i < columns; i++){
      var row = document.createElement("tr");
      row.setAttribute("id","row:"+i);
      for (let j = 0; j < rows; j++){
          var cell = document.createElement("td");
          var id = "cell:"+i+j;
          var classCell= "cellcovered";
          cell.classList.add(classCell);
          cell.setAttribute("id",id);
          row.appendChild(cell);
      }
      table.appendChild(row);
  }
}

