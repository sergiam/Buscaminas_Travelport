Feature: Minesweeper

  '
    empty cell: "o"
    cell with mine: "*"

    Hidden cell: "_"
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


Scenario: Revealing cell with a bomb > Game Over
Given the user loads the mockData "*o"
When the user presses the cell '1-1'
Then the user loses the game

Scenario: Winning the game by revealing cells
Given the user loads the mockData "*o"
When the user clicks at the cell '1-2'
Then the user wins

@done
Scenario: Revealing cell with a bomb > Showing the mine [MINED CELL]
Given the user loads the mockData "*o"
When the user reveals the cell '0-0'
Then the cell "0-0" should show "mine"

@done
Scenario: Default display screen: bomb counter
Given the user loads the mockData "<defaultLayout>"
Then the bomb counter should be "<number>"

Examples:
|  defaultLayout  | number      |
|   *oo-ooo-ooo   | Mine Counter: 1           |
|   **o-o*o-ooo   | Mine Counter: 3           |
|   **o-o**-*oo   | Mine Counter: 5           |
|   ***-o**-***   | Mine Counter: 8           |

@done
Scenario: Clicking a cell without a bomb, showing number of surrounding mines [NUM CELL]
Given the user loads the mockData "<defaultLayout>"
When the user reveals the cell "1-1"
Then the cell "1-1" must show "<number>"

Examples:
|  defaultLayout  | number      |
|   *oo-ooo-ooo   | 1           |
|   **o-*o*-ooo   | 4           |
|   **o-*o*-o*o   | 5           |
|   ***-*o*-o**   | 7           |
|   ***-*o*-***   | 8           |

@done
Scenario: Cell without mine and without surrounding mines > Empty cell [EMPTY CELL]
Given the user loads the mockData "ooo-ooo-ooo"
When the user reveals the cell "2-2"
Then the cell "2-2" must show ""

#Scenario Outline: Revealing an empty cell > Revealing the surrounding cells
#Given the user loads the "<defaultLayout>"
#When the user clicks the cell "<cell>"
#Then should show the "<output>"

#E*amples:
#|  defaultLayout  | cell | output       |
#|   *oo-ooo-ooo   | 1-2  | ooo-1oo-ooo  |
#|   **o-ooo-ooo   | 1-2  | ooo-2oo-ooo  |
#|   ***-ooo-ooo   | 1-2  | ooo-3oo-ooo  |
#|   ***-o*o-ooo   | 1-2  | ooo-4oo-ooo  |
#|   ***-*o*-ooo   | 2-2  | ooo-o5o-ooo  |
#|   ***-*o*-*oo   | 2-2  | ooo-o6o-ooo  |
#|   ***-***-*oo   | 3-2  | ooo-ooo-o7o  |
#|   ***-***-*o*   | 3-2  | ooo-ooo-o8o  |

@done
Scenario Outline: Revealing an empty cell > Revealing the surrounding cells
Given the user loads the mockData "<defaultLayout>"
When the user reveals the cell "<cell>"
Then should show the "<output>"

Examples:
|  defaultLayout                    | cell | output                         |
|   ooo-ooo-ooo                     | 2-2  | ...-...-...                    |
|   *o*oo-ooooo-ooooo-ooooo-ooooo   | 4-3  | ___..-.....-.....-.....-.....  |


#Scenario: An empty cell is revealead by a neighbour > Revealing again adjacent mines

@done
Scenario: Default display screen: All the cells must be covered
Given the user loads the mockData 'ooo'
Then should show the "___"

@done
Scenario: Default display screen: Default time counter
Then the timer should be "0"

@done
Scenario: Default display screen: Default face
Then the face should be 'normal face'

@done
Scenario: Winning game > Smile face
Given the user loads the mockData 'o*'
When the user reveals the cell '0-0'
Then the face should be 'happy face'

@done
Scenario: Sad face
Given the user loads the mockData 'o*'
When the user reveals the cell '0-1'
Then the face should be 'sad face'

@done
Scenario: Reseting the game with face button
Given the user loads the mockData "**o-oo*-***" 
When the user reveals the cell '1-1'
And clicks the "face" button
Then should show the "___-___-___"

@done
Scenario: tagging Flag tag
Given the user loads the mockData "oo*-**o-*oo"
When the user marks the cell '1-1' with "Flag tag"
Then the bomb counter should be "Mine Counter: 3"
And the cell '1-1' shows "minetag"

@done
Scenario: untagging Flag tag
Given the user loads the mockData "oo*-**o-*oo"
When the user unmarks the cell '1-1' with "Flag tag"
Then the bomb counter should be "Mine Counter: 4"
And the cell '1-1' shows "Questionable mark"

@done
Scenario: tagging questionable mark
Given the user loads the mockData "oo*-**o-*oo"
When the user marks the cell '1-1' with "Questionable mark"
Then the bomb counter should be "Mine Counter: 4"
And the cell '1-1' shows "Questionable mark"

@done
Scenario: unTagging questionable mark
Given the user loads the mockData "oo*-**o-*oo"
When the user unmarks the cell '1-1' with "Questionable mark"
Then the bomb counter should be "Mine Counter: 4"
And the cell "1-1" shows "nothing"

Scenario: Restarting the game: all cells covered
Given the user loads the "**o-*oo-*o*" layout
And the user marks the cell '1-1' with a "<Flag tag>"
And the user reveals the cell '3-2'
When the user restart the game
Then all cells should be covered

@manual
Scenario: Restarting the game: time resetting
Given the user loads the "o**-***-**o" layout
And the user reveals the cell '0-0'
And the user waits some seconds
And the user wants to restart the game
When the user restart the game
Then the timer counter should show "0"

Scenario: Restarting the game: flag counter
Given the user loads the "ooo-**o-*o*" layout
And the user marks the cell '1-1' with a "<Flag tag>"
When the user restart the game
Then the remaining flags counter should show "10"

Scenario: Restarting the game: face button
Given the user loads the "**o-*oo-*o*" layout
And the user reveals the cell '2-1'
When the user restart the game
Then the face button should be 'normal'

@manual
Scenario: Time counter increasing: User reveals a cell
Given the user loads the "*o*-oo*-***" layout
When the user reveals the cell '1-1'
Then the time counter should start increasing

@manual
Scenario: Time counter increasing: User marks the cell with Flag tag
Given the user loads the "*o*-oo*-***" layout
When the user marks the cell '2-3' with a "<Flag tag>"
Then the time counter should start increasing

Scenario: Revealing a cell with the mouse
When the user presses left mouse button on the cell
Then the cell should be "revealed"

@todo
Scenario: Showing bombs when user loses the game
Given the user loads the "<inputLayout>" layout
When the user reveals the cell "3-3"
Then the display should show "<outputLayout>"

Examples:
| inputLayout | outputLayout |
| *oo-o**-oo* | *..-.**-..*  |
| ***-*oo-o** | ***-*..-.**  |
| *o*-***-*** | *.*-***-***  |
| ***-ooo-*** | ***-...-***  |

#Scenario: Revealing an empty cell (neighbours)
#Definition of an empty cell