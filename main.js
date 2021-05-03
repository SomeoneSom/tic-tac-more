var turn = true;
var board = [["", "", ""], ["", "", ""], ["", "", ""]];
var directionsMatrix = {
    vertical: {south: [1, 0], north: [-1, 0]},
    horizontal: {east: [0, 1], west: [0, -1]},
    up: {southWest: [1, -1], northEast: [-1, 1]},
    down: {southEast: [1, 1], northWest: [-1, -1]}
};
function checkWinner(row, col, piece) {
    if (!board.some(r => r.includes(""))) {
        return "draw";
    }
    for (let axis in directionsMatrix) {
        let numMatches = 1;
        for (let direction in directionsMatrix[axis]) {
            let cellReference = [row, col];
            let testCell = board[cellReference[0]][cellReference[1]];
            console.log(testCell + piece + numMatches);
            console.log(cellReference);
            while (testCell == piece) {
                try {
                    cellReference[0] += directionsMatrix[axis][direction][0];
                    cellreference[1] += directionsMatrix[axis][direction][1];
                    console.log(cellReference);
                    testCell = board[cellReference[0]][cellReference[1]];
                    console.log(testCell);
                    if (testCell == piece) {
                        numMatches += 1;
                        if (numMatches >= 3) {
                            return "win";
                        }
                    }
                    console.log(testCell + piece + numMatches);
                } catch (error) {
                    break;
                }
            }
            if (numMatches >= 3) {
                console.log(testCell + piece + numMatches);
                return "win";
            }
        }
    }
    return "continue";
}
function makeMove(elem, num) {
    if (document.getElementById(elem).innerHTML != "") {
        return;
    }
    document.getElementById(elem).innerHTML = turn ? "O" : "X";
    board[Math.floor(num / 3)][num % 3] = turn ? "O" : "X";
    turn = !turn;
    let winState = checkWinner(Math.floor(num/3), num % 3, turn ? "X" : "O");
    if (winState == "win") {
        document.getElementById("winner").innerHTML = (turn ? "X" : "O") + "wins!";
    } else if (winState == "draw") {
        document.getElementById("winner").innerHTML = "Draw!";
    }
    console.log(board);
}

var elems = [];
for (var i = 1; i < 10; i++) {
    elems.push("item" + i.toString());
    console.log("item" + i.toString());
    document.getElementById(elems[i - 1]).addEventListener("click", makeMove.bind(this, elems[i-1], i-1), false);
}