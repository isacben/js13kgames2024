'use strict';

function resetGame() {
    score = 0;
    powerUp = 0;
    level = Array.from(Array(columns), () => []);
    hideButtons(false)
}

function spawnBlock() {
    if (spawnBlockTimer.elapsed()) {
        const col = randInt(0, columns);
        const pos = level[col].length + 1;
        const x = col * blockSize + blockSize / 2;
        const y = firstRow - pos * blockSize;

        level[col].push(new Block(vec2(x, y), pos, col));

        spawnBlockTimer.set(rand(0.1, .8));
    }
}

function moveBlocks() {
    for (let col=0; col<columns; col++)
    for (let row=0; row<level[col].length; row++) {
        level[col][row].pos.y = firstRow-(row)*blockSize; 
    }
}

function fire(swiped=false) {
    if (swiped) { // hard bullet
        if (hardBullets > 0) {
            new Bullet(player.pos, vec2(0, 0.8), "hard");
            hardBullets -= 1;
        }
        return 0;
    }
    
    if (powerUp === 0) { // normal bullet
        new Bullet(player.pos);
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

    // diamond that gives you a strong bullet
    if (hardBulletTimer.elapsed()) {
        const x = randInt(1,15);
        new Diamond(vec2(x, 41), 1, "hard");
        hardBulletTimer.set(10,20);
    }
}

function swiped() {
    if (touchEnd.y > touchStart.y && touchEnd.y - touchStart.y > 3 && !swipeTimer.elapsed())
        return true;

    return false;
}

function hideButtons(hidden) {
    if (hidden) {
        playBtn.pos = vec2(-5, -5);
    } else {
        playBtn.pos = cameraPos;
    }
}

function printTitle() {
    const title = "UNBLOCK";
    const posX = .9;
    const posY = 30;
    const size = vec2(.7)
    let currX = 0;
    for (let i=0; i < title.length; i++) {
        let letter = gameTitle[title.charAt(i)];

        let currY = 0;
        let addX = 0;

        for (let y = letter.length-1; y >= 0; y--) {
            let row = letter[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x]) {
                    drawRect(vec2(posX + currX + x*size.x, posY + currY), size, blockColor);
                }
            }
            addX = Math.max(addX, row.length * size.x);
            currY += size.x;
        }
        currX += size.x + addX;
    }
}