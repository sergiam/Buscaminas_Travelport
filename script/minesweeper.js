const columns = 8;
const rows = 8;
let mineCounter = 10;


create_Table();


function initGame(mockdata){
    const params = new URLSearchParams(window.location.search);
    const mockDataValue = params.get(mockdata);
    if (mockDataValue.includes('-')) {
        mockDataValue = mockDataValue.split("-");
    } else if (mockDataValue.includes (' ')) {
        mockDataValue = mockDataValue.split(' ')
    }
    return mockDataValue;
}

function create_Table() {


    var tabla = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    document.getElementById("minesweeper-board").appendChild(tabla);
   
    for (var i = 0; i <= rows; i++) {

    }

}