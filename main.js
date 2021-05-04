var elems = [];
var vals = [3, 3, 2, 3];
var gameBoard = null;
function startGame() {
    gameBoard = new twoDimensionalBoard(3, 3, 2, 3);
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