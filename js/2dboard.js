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
        this.board = [];
        for (let i = 0; i < height; i++) {
            this.board.push(Array(width).fill(""))
        }
        this.turn = 0;
        this.players = maxPlayers;
        this.pieces = ["<img src='./coolImg/x.svg' alt='X'>",
        "<img src='./coolImg/o.svg' alt='O'>",
        "<img src='./coolImg/triangle.svg' alt='TRIANGLE'>",
        "<img src='./coolImg/square.svg' alt='SQUARE'>",
        "<img src='./coolImg/plus.svg' alt='PLUS'>",
        "<img src='./coolImg/minus.svg' alt='MINUS'>",
        "<img src='./coolImg/octagon.svg' alt='OCTAGON'>",
        "<img src='./coolImg/heart.svg' alt='HEART'>"];
        this.inARow = inARow;
        this.done = false;
        let percent = Math.min((3/this.h) * 10, (3/this.w) * 10);
        document.getElementById("grid").style.cssText = `grid-template-columns: repeat(${this.w}, ${percent}%);grid-template-rows: repeat(${this.h}, ${percent}vw);`
        for (let i = 1; i < (this.h * this.w) + 1; i++) {
            elems.push("item" + i.toString());
            document.getElementById("grid").innerHTML += `<div id="${elems[i-1]}" style="line-height: ${percent}vw"></div>`;
        }
    }
    makeMove(item, num) {
        if (document.getElementById(item).innerHTML != "" || this.done) {
            return;
        }
        document.getElementById(item).innerHTML = this.pieces[this.turn];
        //jQuery('#grid').fitText();
        this.board[Math.floor(num  / this.w)][num % this.w] = this.pieces[this.turn];
        let winState = this.getWinState(Math.floor(num/this.w), num % this.w);
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
                            if (numMatches >= this.inARow) {
                                return this.pieces[this.turn] + " wins!";
                            }
                        }
                    } catch (error) {
                        break;
                    }
                }
                if (numMatches >= this.inARow) {
                    return this.pieces[this.turn] + " wins!";
                }
            }
        }
        if (!this.board.some(r => r.includes(""))) {
            return "Draw!";
        }
        return "continue";
    }
    destroy () {
        elems = [];
        this.board = null
        document.getElementById("grid").innerHTML = "";
        document.getElementById("winner").innerHTML = "Game is ongoing...";
    }
}