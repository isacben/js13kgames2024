'use strict';

function resetGame() {
    score = 0;
    lines.fill(0);
}

function spawnBlock() {
    if (spawnBlockTimer.elapsed()) {
        const lines2 = [l1, l2, l3, l4, l5, l6, l7, l8];
        const col = randInt(0, 8);
        
        //for (let row=0; row<13; row++) {
        //    if (level[row*8 + col] === null) {
        //        level[row*8 + col] = new Block(col*blockSize+blockSize/2, firstRow-(row+1)*blockSize, row+1, row*8+col);
        //        break;
        //    }
        //}

        
        const pos = level[col].length + 1;
        const x = col*blockSize+blockSize/2;
        const y = firstRow-pos*blockSize;
        level[col].push(new Block(x, y, pos, pos-1, col));
        //spawnBlockTimer.set(rand(0.1, .8));
        spawnBlockTimer.set(rand(0.5, 1.8));
    }
}

function moveBlocks() {
    const lines2 = [l1, l2, l3, l4, l5, l6, l7, l8];
    for (let col=0; col<8; col++)
    for (let row=0; row<level[col].length; row++) {
        //level[(row-1)*8 + col].pos.y = firstRow-(row)*blockSize; 
        level[col][row].pos.y = firstRow-(row)*blockSize; 
    }
}

function fire() {
    //new Bullet(player.pos.x, player.pos.y, "hard");
    for (let i=-.2; i<=.2; i+=.2) {
        new Bullet(player.pos.x, player.pos.y, vec2(i, 1));
    }
}