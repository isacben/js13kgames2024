'use strict';

function resetGame() {
    gameInit();
}

function spawnBlock() {
    if (spawnBlockTimer.elapsed()) {
        const col = randInt(0, 8);
        const pos = level[col].length + 1;
        const x = col * blockSize + blockSize / 2;
        const y = firstRow - pos * blockSize;

        level[col].push(new Block(vec2(x, y), pos, col));

        spawnBlockTimer.set(rand(0.1, .8));
    }
}

function moveBlocks() {
    for (let col=0; col<8; col++)
    for (let row=0; row<level[col].length; row++) {
        level[col][row].pos.y = firstRow-(row)*blockSize; 
    }
}

function fire() {
    //new Bullet(player.pos, vec2(0, 0.6), "hard");
    for (let i=-.2; i<=.2; i+=.2) {
        new Bullet(player.pos, vec2(i, .8));
    }
}