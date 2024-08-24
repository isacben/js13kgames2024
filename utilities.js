'use strict';

function resetGame() {
    score = 0;
    powerUp = 0;
    level = Array.from(Array(8), () => []);
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
    if (powerUp === 0) { // normal bullet
        new Bullet(player.pos);
        return 0;
    }

    if (powerUp >= 10) { // hard bullet
        new Bullet(player.pos, vec2(0, 0.8), "hard");
        powerUp -= 10;
        return 0;
    }

    for (let i=-.2; i<=.2; i+=.2) // spread attack 
    new Bullet(player.pos, vec2(i, 1));
    powerUp--;
    return 0;
}

function spawnDiamond() {
    if (diamondTimer.elapsed()) {
        const x = randInt(1, 15);
        new Diamond(vec2(x, 41));
        diamondTimer.set(2);
    }
}