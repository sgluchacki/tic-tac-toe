/*----- constants -----*/ 
const playerLookup = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};

/*----- app's state (variables) -----*/ 
let board;      // Array of column arrays with 1, -1, or null
let turn;       // 1 or -1 (player)
let winner;     // 1 = Player 1; -1 = Player 2; 'T' = tie; null = no winner/tie


/*----- cached element references -----*/ 
const boardEls = document.querySelectorAll('#board > .row > div');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/ 
document.getElementById('board').addEventListener('click', handleClick)

/*----- functions -----*/
init();
function init() {
    board = [
        [1, null, null],
        [null, null, null],
        [null, -1, null]
    ];
    turn = 1;
    winner = null;
    render();
}

function render() {
    renderBoard();
    
    if (winner) {
        if (winner === 'T') {
            // It's a tie
        } else {
            // look up pleayer and display message
        }

    } else {
        // Display next turn
    }

}

function renderBoard() {
    // render the board
    // iterate over columns and rows looking for 1, -1, and null
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cell, colIdx) {
            const div = document.getElementById(`c${colIdx}r${rowIdx}`)
            div.innerText = playerLookup[cell];
        });
    });
}

function getWinner() {
    // look in columns, rows, and diagonals for abs(sum) = 3 for winner
}

function handleClick(event) {
    //const rowIdx = boardEls.indexOf(evt.target);

    console.log(event.target.id);


}