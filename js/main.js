/*----- constants -----*/ 
const xAndO = {
    '1': 'X',
    '-1': 'O',
    'null': null
};

/*----- app's state (variables) -----*/ 
let board;      // Array of column arrays with 1, -1, or null
let turn;       // 1 or -1 (player)
let winner;     // 1 = Player 1; -1 = Player 2; 'T' = tie; null = no winner/tie



/*----- cached element references -----*/ 
const boardEls = [...document.querySelectorAll('#board > .row > div')];
const msgEl = document.getElementById('msg');
const buttonEl = document.getElementById('replay');


/*----- event listeners -----*/ 
document.getElementById('board').addEventListener('click', clickEvent);
document.getElementById('replay').addEventListener('click', init);

/*----- functions -----*/
init();
function init() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    turn = 1;
    winner = null;
    buttonEl.style.visibility = 'hidden';
    render();
}

function render() {
    renderBoard();
    checkWinner();
    
    if (winner) {   
        //display button for play again
        buttonEl.style.visibility = 'visible';
        
        if (winner === 'Tie') {
            // Display message: 'it's a tie'
            msgEl.innerText = 'Tie Game.'
        } else {
            // look up player and display message
            msgEl.innerHTML = `<span id="player">${xAndO[winner]}</span> Wins!`
        }
        
    } else {
        // Display next turn
        //renderBoard();
        msgEl.innerHTML = `<span id="player">${xAndO[turn]}</span>'s Turn.`
        
    }
    //console.log(winner);
}

function renderBoard() {
    // render the board
    // iterate over columns and rows looking for 1, -1, and null
    if (winner) {
        console.log('winner chicken dinner');
        return;
    } else {
        board.forEach(function(rowArr, rowIdx) {
            rowArr.forEach(function(cell, colIdx) {
                const div = document.getElementById(`r${rowIdx}c${colIdx}`);
                div.innerText = xAndO[cell];
            });
        });
    }
}


function clickEvent(event) {
    //const rowIdx = boardEls.indexOf(evt.target);
    const cellIdx = boardEls.indexOf(event.target);
    let cellContents = boardEls[cellIdx].innerText;
    const cellId = boardEls[cellIdx].id;
    const rowIdx = parseInt(cellId.substr(1,1));
    const colIdx = parseInt(cellId.substr(3,1));
    //console.log(`row: ${rowIdx}`);
    //console.log(`column: ${colIdx}`);
    
    // if cell contents are nonnull do nothing, else change to 1 or -1
    if (cellContents === 'X' || cellContents === 'O') return;
    else {
        //cellContents = xAndO[turn];
        //need to use row and cell indices to change the values on the board
        //should look something like board[rowId[cellId]] = turn;
        board[rowIdx][colIdx] = turn;
        //console.log(board);
    }
    //console.log(cellContents);
    //console.log(typeof(cellContents));
    //console.dir(boardEls[cellIdx]);
    // console.log(typeof(boardEls[cellIdx]));
    // console.log(cellIdx);
    //console.log(cellId);
    
    // console.log(event.target);
    //render();
    render();
    //checkWinner();      // stop game here if winner
    // if (winner) {
    //     board.forEach(function(rowArr, rowIdx) {
    //         rowArr.forEach(function(cell, colIdx) {
    //             const div = document.getElementById(`r${rowIdx}c${colIdx}`);
    //             div.innerText = xAndO[cell];
    //         });
    //     });

    // }
    turn *= -1;
    // setTimeout(function(){
    //     if (winner) return;
    // }, 500);
    //console.log(winner);
}


function checkWinner() {
    // look in columns, rows, and diagonals for abs(sum) = 3 for winner 
    // using indices
    // sum across ri, sum across cj, and diagonals (from grabbed ids)
    // if board is full, return 'Tie'
    // cellIdx, cellID, rowIdx, colIdx available since this is strictly called by clickEvent
    checkRows();
    checkColumns();
    checkDiagonals();
    catsGame();

    

}                 //keep playing

function sumArray(arr) {
    let sum = 0;
    for (let i=0; i < arr.length; i++) {
    sum += arr[i];
    }
    return sum;
}

function transpose2dArr(arr) {
    const newArr = [];
    for (i=0; i < arr.length; i++) {
        newArr.push([]);
    }

    for (i=0; i < arr.length; i++) {
        for (j=0; j < arr[i].length; j++) {
            newArr[j].push(arr[i][j]);
        }
    }
    return newArr;
}


function checkRows() {
    board.forEach(function(row) {
        if (Math.abs(sumArray(row)) === 3) {
             return winner = row[0];
        }
    });
}

function checkColumns() {
    const transBoard = transpose2dArr(board);
    transBoard.forEach(function(column) {
        if (Math.abs(sumArray(column)) === 3) {
            return winner = column[0];
        }
    });    
}

function checkDiagonals() {
    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) === 3 || Math.abs(board[2][0] + board[1][1] + board[0][2]) === 3) {
        return winner = board[1][1];
    }
}

function catsGame() {
    if (winner) return;
    else if (!board[0].includes(null) && !board[1].includes(null) && !board[2].includes(null)) {
        return winner = 'Tie';
    }
} 