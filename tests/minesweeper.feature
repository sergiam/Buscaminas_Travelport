Feature: Minesweeper

  '
    empty cell: "o"
    cell with mine: "x"

    Hidden cell: "o" > "_"
    Flag tag: "!"
    Questionable tag: "?"
    Row "-"
    Empty "."

    1 means a cell with 1 adjacent mine
    2 means a cell with 2 adjacents mines
    3 means a cell with 3 adjacents mines
    4 means a cell with 4 adjacents mines
    5 means a cell with 5 adjacents mines
    6 means a cell with 6 adjacents mines
    7 means a cell with 7 adjacents mines
    8 means a cell with 8 adjacents mines
  '

Background:
Given a user enters to the page

@current
Scenario: Revealing cell with a bomb > Game Over
Given the user loads the mockData "xo"
When the user presses the cell '1-1'
Then the user loses the game

Scenario: Winning the game by revealing cells
Given the user loads the mockData "xo"
When the user clicks at the cell '1-2'
Then the user wins

Scenario: Revealing cell with a bomb > Showing the mine [MINED CELL]
Given the user loads the mockData "xo"
When the user presses the cell '1-1'
Then the cell "1-1" should show "mine"

Scenario: Default display screen: bomb counter
Given the user loads the "<defaultLayout>"
Then the bomb counter should be "<number>"

Examples:
|  defaultLayout  | number      |
|   xoo-ooo-ooo   | 1           |
|   xxo-oxo-ooo   | 3           |
|   xxo-oxx-xoo   | 5           |
|   xxx-oxx-xxx   | 8           |

Scenario: Clicking a cell without a bomb, showing number of surrounding mines [NUM CELL]
Given the user loads the "<defaultLayout>"
When the user reveals the cell "2-2"
Then the cell "2-2" should show "number"

Examples:
|  defaultLayout  | number      |
|   xoo-ooo-ooo   | 1           |
|   xxo-xox-ooo   | 4           |
|   xxo-xox-oxo   | 5           |
|   xxo-xxx-oxx   | 7           |
|   xxx-xox-xxx   | 8           |

Scenario: Cell without mine and without surrounding mines > Empty cell [EMPTY CELL]
Given the user loads the "ooo-ooo-ooo" layout
When the user reveals the cell "2-2"
Then the cell "2-2" should be "empty"

#Scenario Outline: Revealing an empty cell > Revealing the surrounding cells
#Given the user loads the "<defaultLayout>"
#When the user clicks the cell "<cell>"
#Then should show the "<output>"

#Examples:
#|  defaultLayout  | cell | output       |
#|   xoo-ooo-ooo   | 1-2  | ooo-1oo-ooo  |
#|   xxo-ooo-ooo   | 1-2  | ooo-2oo-ooo  |
#|   xxx-ooo-ooo   | 1-2  | ooo-3oo-ooo  |
#|   xxx-oxo-ooo   | 1-2  | ooo-4oo-ooo  |
#|   xxx-xox-ooo   | 2-2  | ooo-o5o-ooo  |
#|   xxx-xox-xoo   | 2-2  | ooo-o6o-ooo  |
#|   xxx-xxx-xoo   | 3-2  | ooo-ooo-o7o  |
#|   xxx-xxx-xox   | 3-2  | ooo-ooo-o8o  |


Scenario Outline: Revealing an empty cell > Revealing the surrounding cells
Given the user loads the "<defaultLayout>"
When the user clicks the cell "<cell>"
Then should show the "<output>"

Examples:
|  defaultLayout                    | cell | output                         |
|   ooo-ooo-ooo                     | 2-2  | ...-...-...                    |
|   xxxxx-xooox-xooox-xooox-xxxxx   | 3-3  | .....-.555.-.5.5.-.555.-.....  |
|   xooo-oooo-oooo-oooo             | 4-4  | .1..-11..-....-....            |
|   xoo-xxo-ooo                     | 2-3  | ...-..3-...                    |


#Scenario: An empty cell is revealead by a neighbour > Revealing again adjacent mines


Scenario: Default display screen: All the cells must be covered
Given the user loads the default mockData
Then All the cells should be "covered"

Scenario: Default display screen: Default time counter
Given the user loads the default mockData
Then the timer should be "0"

Scenario: Default display screen: Default face
Then the face should be 'normal face'

Scenario: Winning game > Smile face
Given the user wins the game
Then the face should be 'smile face'

Scenario: Sad face
Given the user lose the game
Then the face should be 'sad face'

Scenario: Reseting the game with face button
Given the user loads the "xxo-oox-xxx" layout
When the user reveals the cell '2-1'
And clicks the "face" button
Then the game should be reset

Scenario: Restarting the game when user already lost
Given the user lost
When the user clicks the 'sad face' button
Then the game restarts

Scenario: tagging Flag tag
Given the user loads the "oox-xxo-xoo" layout
When the user marks the cell '1-1' with "<Flag tag>"
Then the remaining flags counter should show "9"
And the cell '1-1' shows "<Flag tag>"

Scenario: untagging Flag tag
Given the user loads the "oox-xxo-xoo" layout
When the user unmarks the cell '1-1' with "<Flag tag>"
Then the remaining flags counter should show "10"
And the cell '1-1' shows "nothing"

Scenario: tagging questionable mark
Given the user loads the "oox-xxo-xoo" layout
When the user marks the cell '1-1' with "<Questionable mark>"
Then the remaining flags counter should show "10"
And the cell '1-1' shows "<Questionable mark>"

Scenario: unTagging questionable mark
Given the user loads the "oox-xxo-xoo" layout
When the user unmarks the cell '1-1' with "<Questionable mark>"
Then the remaining flags counter should show "10"
And the cell "1-1" shows "nothing"

Scenario: Restarting the game: all cells covered
Given the user loads the "xxo-xoo-xox" layout
And the user marks the cell '1-1' with a "<Flag tag>"
And the user reveals the cell '3-2'
When the user restart the game
Then all cells should be covered

@manual
Scenario: Restarting the game: time resetting
Given the user loads the "oxx-xxx-xxo" layout
And the user reveals the cell '1-1'
And the user waits some seconds
And the user wants to restart the game
When the user restart the game
Then the timer counter should show "0"

Scenario: Restarting the game: flag counter
Given the user loads the "ooo-xxo-xox" layout
And the user marks the cell '1-1' with a "<Flag tag>"
When the user restart the game
Then the remaining flags counter should show "10"

Scenario: Restarting the game: face button
Given the user loads the "xxo-xoo-xox" layout
And the user reveals the cell '2-2'
When the user restart the game
Then the face button should be 'normal'

@manual
Scenario: Time counter increasing: User reveals a cell
Given the user loads the "xox-oox-xxx" layout
When the user reveals the cell '2-2'
Then the time counter should start increasing

@manual
Scenario: Time counter increasing: User marks the cell with Flag tag
Given the user loads the "xox-oox-xxx" layout
When the user marks the cell '2-3' with a "<Flag tag>"
Then the time counter should start increasing

Scenario: Revealing a cell with the mouse
When the user presses left mouse button on the cell
Then the cell should be "revealed"

Scenario: Showing bombs when user loses the game
Given the user loads the "<inputLayout>" layout
When the user reveals the cell "3-3"
Then the display should show "<outputLayout>"

Examples:
| inputLayout | outputLayout |
| xoo-oxx-oox | x..-.xx-..x  |
| xxx-xoo-oxx | xxx-x..-.xx  |
| xox-xxx-xxx | x.x-xxx-xxx  |
| xxx-ooo-xxx | xxx-...-xxx  |

#Scenario: Revealing an empty cell (neighbours)
#Definition of an empty cell