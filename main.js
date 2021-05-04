var elems = [];
var gameBoard = null;
function startGame() {
    gameBoard = new twoDimensionalBoard(parseInt(document.getElementById("width").value),
    parseInt(document.getElementById("height").value),
    parseInt(document.getElementById("players").value),
    parseInt(document.getElementById("inARow").value));
    for (var i = 1; i < (gameBoard.h * gameBoard.w) + 1; i++) {
        document.getElementById(elems[i - 1]).addEventListener("click", gameBoard.makeMove.bind(gameBoard, elems[i-1], i-1), false);
    }
}
function reset() {
    for (var i = 1; i < (gameBoard.h * gameBoard.w) + 1; i++) {
        document.getElementById(elems[i - 1]).removeEventListener("click", gameBoard.makeMove.bind(gameBoard, elems[i-1], i-1), false);
    }
    gameBoard.destroy();
    gameBoard = null;
    startGame();
}
startGame();