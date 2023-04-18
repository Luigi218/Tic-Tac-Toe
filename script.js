//Global Variables
const player_cross = "X"
const player_circle = "O"
const cellElements = document.querySelectorAll("[data-cell]")
const boardElement = document.getElementById("board")
const afterGameElement = document.getElementById("afterGameContainer")
const winMessageElement = document.getElementById("winMessage")
const previousBtn = document.getElementById("previousBtn")
const nextBtn = document.getElementById("nextBtn")
const restartBtn = document.getElementById("restartBtn")
let player_circle_turn = false

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let moves = []
let redoMoves = []
let moveCounter = 0

const circle = document.getElementById("circle")
const cross = document.getElementById("cross")
const frontPage = document.getElementById("frontPage")
const gameContainer = document.getElementById("gameContainer")

//Transitions from choice page, to to game board after 2 seconds
function choicePicked () {
        frontPage.classList.toggle("hidden");
        gameContainer.classList.toggle("hidden");
}

//Starts the game by resetting the board (removing Xs and Os)
function startGame () {
    //Chooses whether "X" or "O" has the first turn
    circle.addEventListener("click", function () {
        player_circle_turn = true;
    });
    cross.addEventListener("click", function () {
        player_circle_turn = false;
    });
    //Removes existing marks (X/O)
    cellElements.forEach(cell => {
        cell.classList.remove(player_cross, player_circle);
        cell.addEventListener("click", cellClick, { once:true })
    })
    //Hides winner message, and buttons 
    afterGameElement.classList.add("hidden");
    //Clears record of moves and turn move counter
    moves = [];
    redoMoves = [];
    moveCounter = 0;
    previousBtn.disabled = false;
    nextBtn.disabled = false;
}

//Records if X or O turn, and evaluates game progress (Win, Draw, Next Turn)
function cellClick(e) {
    const cell = e.target
    const currentClass = player_circle_turn ? player_circle : player_cross
    const cellIndex = e.target.getAttribute("id")
    placeSymbol (cell, currentClass);
    moves.push([cellIndex, currentClass]);
    console.log(moves)
    moveCounter = moveCounter + 1;
    console.log(moveCounter)
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (checkDraw()) {
        endGame(true)
    }
    else {
        changeTurns()
    }
}

//Message if draw or win
function endGame(draw) {
    if (draw) {
        winMessageElement.innerHTML = "It's a draw!"
        cellElements.forEach(cell => {
            cell.removeEventListener("click", cellClick)
        })
    }
    else {
        winMessageElement.innerHTML = `${player_circle_turn ? "O" : "X"} wins!`
        cellElements.forEach(cell => {
            cell.removeEventListener("click", cellClick)
        }
        )
    };
    afterGameElement.classList.toggle("hidden")
}

//If all cells filled, with no winning combinations
function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(player_cross) || cell.classList.contains(player_circle)
    })
}

//Adds "X" or "O" to cell
function placeSymbol (cell, currentClass) {
    cell.classList.add(currentClass);
}

//Changes whose turn it is
function changeTurns () {
    player_circle_turn = !player_circle_turn
}

//Checks if side has a winning combination
function checkWin (currentClass) {
    return winConditions.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function undoMove(){
    if (moves.length > 0) {
        moveCounter --;
        let lastMoveArr = moves[moves.length-1];
        let lastMoveIndex = lastMoveArr[0];
        document.getElementById(lastMoveIndex).classList.remove("X", "O");
        redoMoves.push(moves.pop());
    }
    else if (moves.length === 0) {
        previousBtn.disabled = true;
        nextBtn.disabled = false;
    }
}

function redoMove(){
    if (redoMoves.length > 0 ) {
        moveCounter ++;
        let nextMoveArr = redoMoves[redoMoves.length-1];
        let nextMoveIndex = nextMoveArr[0];
        let nextMoveSymbol = nextMoveArr[1];
        document.getElementById(nextMoveIndex).classList.add(nextMoveSymbol)
        moves.push(redoMoves.pop());
    }
    else if (redoMoves.length === 0) {
        nextBtn.disabled = true;
        previousBtn.disabled = false;
    }
}

circle.addEventListener("click", choicePicked)
cross.addEventListener("click", choicePicked)
restartBtn.addEventListener("click", startGame)
previousBtn.addEventListener("click", undoMove)
nextBtn.addEventListener("click", redoMove)

//Initalizes board
startGame();