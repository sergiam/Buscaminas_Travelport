const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mockData = urlParams.get('mockData');
console.log(mockData);
var board = [];

const parseMockDataToString = (data) => {
    let strData = data.split(/\r?\n/).join('-')
    strData = strData.replaceAll(' ', '')
    strData = strData.replaceAll('|', '')
    while (strData[strData.length - 1] === '-') {
      strData = strData.slice(0, -1)
    }
    return strData
}


//Toni's functions for validating and parsing the mockdata
const validateMockData = (data) => {
    let isValidData
    if (data === undefined) {
      isValidData = false
    } else if (data.includes('-')) {
      isValidData = validateMockDataRows(data.split('-'))
    } else {
      isValidData = validateMockDataRow(data)
    }
    return isValidData
}

//Toni's functions for validating and parsing the mockdata
const validateMockDataRow = (data) => {
    const newLocal = '^[*o]*$'
    const regex = new RegExp(newLocal)
    return regex.test(data)
}

//Toni's functions for validating and parsing the mockdata
const validateMockDataRows = (dataRows) => {
    const currentLenght = dataRows[0].length
    let isValidData
    for (let i = 0; i < dataRows.length; i += 1) {
      if (dataRows[i].length !== currentLenght) {
        isValidData = false
        break
      }
      isValidData = validateMockDataRow(dataRows[i])
    }
    return isValidData
}

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
          isMine: mockBoard[row][column] === '*'
        })
      }
    }
    console.log('board', board)
    return board
}

