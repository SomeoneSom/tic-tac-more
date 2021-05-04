var elems = [];
var gameBoard = new twoDimensionalBoard(3, 3, 2, 3);
for (var i = 1; i < (gameBoard.h * gameBoard.w) + 1; i++) {
    elems.push("item" + i.toString());
    console.log("item" + i.toString());
    document.getElementById(elems[i - 1]).addEventListener("click", gameBoard.makeMove.bind(gameBoard, elems[i-1], i-1), false);
}