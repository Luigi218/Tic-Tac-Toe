//Global Variables

const player_cross = "cross"
const player_circle = "circle"
const cellElements = document.querySelectorAll("dataCell")
const boardElement = document.getElementById("board")
const afterGameElement = document.getElementById("afterGame")
const winMessageElement = document.getElementById("winMessage")
const restartElement = document.getElementById("restartMessage")
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]