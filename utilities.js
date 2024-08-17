'use strict';

function resetGame() {
    score = 0;
    lines.fill(0);
}

function spawnBlock() {
    const col = randInt(0, 8);
    lines[col]++;
    new Block(col*blockSize+blockSize/2, firstRow-lines[col]*blockSize, lines[col]);
}