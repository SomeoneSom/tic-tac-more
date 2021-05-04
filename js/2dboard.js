var directionsMatrix = {
    vertical: {south: [1, 0], north: [-1, 0]},
    horizontal: {east: [0, 1], west: [0, -1]},
    up: {southWest: [1, -1], northEast: [-1, 1]},
    down: {southEast: [1, 1], northWest: [-1, -1]}
};
class twoDimensionalBoard {
    constructor(width, height, maxPlayers, inARow) {
        this.w = width;
        this.h = height
        this.board = Array(height).fill().map(() => Array(width).fill(""));
        this.turn = 0;
        this.players = maxPlayers;
        this.pieces = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.inARow = inARow;
        this.done = false;
    }
    makeMove(item, num) {
        if (document.getElementById(item).innerHTML != "" || this.done) {
            return;
        }
        document.getElementById(item).innerHTML = this.pieces[this.turn];
        this.board[Math.floor(num / this.h)][num % this.w] = this.pieces[this.turn];
        let winState = this.getWinState(Math.floor(num/3), num % 3);
        if (winState != "continue") {
            this.done = true;
            document.getElementById("winner").innerHTML = winState;
            return;
        } else {
            this.turn++;
            this.turn %= this.players;
        }
    }
    getWinState(row, col) {
        for (let axis in directionsMatrix) {
            let numMatches = 1;
            for (let direction in directionsMatrix[axis]) {
                let cellReference = [row, col];
                let testCell = this.board[cellReference[0]][cellReference[1]];
                while (testCell == this.pieces[this.turn]) {
                    try {
                        cellReference[0] += directionsMatrix[axis][direction][0];
                        cellReference[1] += directionsMatrix[axis][direction][1];
                        testCell = this.board[cellReference[0]][cellReference[1]];
                        if (testCell == this.pieces[this.turn]) {
                            numMatches += 1;
                            if (numMatches >= 3) {
                                return this.pieces[this.turn] + " wins!";
                            }
                        }
                    } catch (error) {
                        console.log(error.name);
                        console.log(error.message);
                        break;
                    }
                }
                if (numMatches >= 3) {
                    return this.pieces[this.turn] + " wins!";
                }
            }
        }
        if (!this.board.some(r => r.includes(""))) {
            return "Draw!";
        }
        return "continue";
    }
}