'use strict';

function startGame() {
    if (!isMuted) sound_button.play();
    hideButtons(true);
    drawLevel(stage);
    stageTimer.set(1.5);
    state = "stage";
}

function isGameOver() {
    for (let i=0; i<columns; i++) {
        if (level[i].length > 12) {
            lostTimer.set(0.1);
            state = "lost";
        }
    }
}

function resetGame() {
    score = 0;
    powerUp = 0;
    destroyedBlocks = 0;
    hardBullets = 0;
    level = Array.from(Array(columns), () => []);
    hideButtons(false)
}

function nextStage() {
    if (destroyedBlocks > 10) {
        stage++;
        drawLevel(stage);
        state = "stage";
        stageTimer.set(1.5);
        destroyedBlocks = 0;
    }
}

function showInfo() {
    drawTile(vec2(1,38.5),vec2(1.2),tile(2), extraColor);
    drawTextScreen("x " + hardBullets, vec2(130, 45), 40, playerColor);
    drawTextScreen(
        score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        vec2(mainCanvasSize.x - 55, 48),
        50, playerColor,
        undefined, undefined,
        "right"
    );
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

        //if (!isMuted) sound_shot.play(player.pos);
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
        soundBtn.pos = vec2(-5, -5);
    } else {
        playBtn.pos = cameraPos;
        soundBtn.pos.x = cameraPos.x;
        soundBtn.pos.y = cameraPos.y - 2.5;
    }
}

function printTitle() {
    const title = "UNBLOCK";
    const posX = 1.5;
    const posY = 30;
    const size = vec2(.65, .6)

    if (!titleTimer.isSet()) {
            titleTimer.set(.5);
    }

    if (titleTimer.elapsed()) {
        const pos = randInt(0,7);
        titleLetter = "UNBLOCK".charAt(pos);
        titleTimer.set(rand(.7, 2));

        if (!isMuted) sound_letter.play(vec2(pos*4, 30));
    }

    let color = blockColor;

    let currX = 0;
    for (let i=0; i < title.length; i++) {
        let letter = gameTitle[title.charAt(i)];

        if (title.charAt(i) === titleLetter) {
            color = bgColor.lerp(playerColor, titleTimer.getPercent()-.01);
        } else {
            color = playerColor;//.lerp(blockColor, titleTimer.getPercent());
        }

        let currY = 0;
        let addX = 0;

        for (let y = letter.length-1; y >= 0; y--) {
            let row = letter[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x]) {
                    drawRect(vec2(posX + currX + x*size.x, posY + currY), size, color);
                }
            }
            addX = Math.max(addX, row.length * size.x);
            currY += size.x;
        }
        currX += size.x + addX;
    }
}

function drawLevel(l) {
    const currLevel = levelData[l];

    for (let col=0; col<columns; col++)
    for (let row=0; row<currLevel.level[col].length; row++) {
        const pos = level[col].length;
        const x = col * blockSize + blockSize / 2;
        const y = firstRow - pos * blockSize;

        if (currLevel.level[col][row] === 2)
            level[col].push(new Block(vec2(x, y), 1000, col));
        else
            level[col].push(new Block(vec2(x, y), pos + 1, col));
    }
}