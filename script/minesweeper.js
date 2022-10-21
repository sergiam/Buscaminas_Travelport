const columns = 8;
const rows = 8;
const mineCounter = 10;

const mineField = [];
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

document.addEventListener('DOMContentLoaded', () => 
{
    if(window.location.search.includes('?')){
        console.log("mockData detected");
        board = createBoardFromMockData(mockData);
        console.log(board);
        generateTable(board.length,board.length);
        addEventClick();
        
    }else{
//        minefieldCreation();
        console.log("no mockData")
        generateTable(columns,rows);
        addEventClick();
    }
})

function addEventClick() {
    //var cell = document.createElement("td");
    let cells = document.getElementsByTagName("td");
    for (const elements of cells) {
        elements.addEventListener('click', () => {
            uncoverCell(elements.getAttribute("id"));
            console.log(elements.getAttribute("id"));
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
    defeat();
}

function defeat(cellId) {
    console.log("perdiste");
}


//Tabla sin mockdata, 8x8
function generateTable(height,width){
  var table = document.getElementById("board-inside-content");
  for (let i = 0; i < height; i++){
      var row = document.createElement("tr");
      row.setAttribute("id","row:"+i);
      for (let j = 0; j < width; j++){
          var cell = document.createElement("td");
          var id =i+"-"+j;
          var classCell= "cellcovered";
          cell.classList.add(classCell);
          cell.setAttribute("id",id);
          row.appendChild(cell);
      }
      table.appendChild(row);
  }
}

