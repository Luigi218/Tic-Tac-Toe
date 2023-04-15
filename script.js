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

let boardStatus = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

let moves = []

const circle = document.getElementById("circle")
const cross = document.getElementById("cross")
const frontPage = document.getElementById("frontPage")
const choiceGo = document.getElementById("choiceGo")
const gameContainer = document.getElementById("gameContainer")

//Transitions from "Let's Go" message to gameboard
function boardSet () {
    choiceGo.classList.toggle("hidden");
    gameContainer.classList.toggle("hidden");
}

//Transitions from choice page, to "Let's Go" message,then to game board after 2 seconds
function choicePicked () {
        frontPage.classList.toggle("hidden");
        choiceGo.classList.toggle("hidden");
        setTimeout(boardSet, 2000);
}

//Enables transition when clicking either circle or cross on initial page
circle.addEventListener("click", choicePicked)
cross.addEventListener("click", choicePicked)

//Resets game when "Restart" button is clicked
restartBtn.addEventListener("click", startGame)

//Starts the game by resetting the board (removing Xs and Os)
function startGame () {
    //Chooses whether circle or cross has the first turn
    circle.addEventListener("click", function () {
        player_circle_turn = true;
    });
    cross.addEventListener("click", function () {
        player_circle_turn = false;
    });
    //Removes existing marks (X/O)
    cellElements.forEach(cell => {
        cell.classList.remove(player_cross);
        cell.classList.remove(player_circle);
        cell.removeEventListener("click", cellClick);
        cell.addEventListener("click", cellClick, { once:true })
    })
    //Hides winner message, and buttons 
    afterGameElement.classList.add("hidden")
}

//Records if X or O turn, and evaluates game progress (Win, Draw, Next Turn)
function cellClick(e) {
    const cell = e.target
    const currentClass = player_circle_turn ? player_circle : player_cross
    placeSymbol (cell, currentClass);
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
    }
    else {
        winMessageElement.innerHTML = `${player_circle_turn ? "O" : "X"} wins!`
    };
    afterGameElement.classList.toggle("hidden")
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(player_cross) || cell.classList.contains(player_circle)
    })
}

function placeSymbol (cell, currentClass) {
    cell.classList.add(currentClass);
}

function changeTurns () {
    player_circle_turn = !player_circle_turn
}

function checkWin (currentClass) {
    return winConditions.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//Initalizes board
startGame();