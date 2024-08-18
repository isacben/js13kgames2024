'use strict';

function resetGame() {
    score = 0;
    lines.fill(0);
}

function spawnBlock() {
    if (spawnBlockTimer.elapsed()) {
        const col = randInt(0, 8);
        lines[col]++;
        new Block(col*blockSize+blockSize/2, firstRow-lines[col]*blockSize, lines[col]);

        spawnBlockTimer.set(rand(0.1, 0.8));
    }
}

function fire() {
    //new Bullet(player.pos.x, player.pos.y, "hard");
    for (let i=-.2; i<=.2; i+=.2) {
        new Bullet(player.pos.x, player.pos.y, vec2(i, 1));
    }
}