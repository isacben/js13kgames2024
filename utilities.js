'use strict';

function startGame() {
    hardBullets = 0;

    hideButtons(true);
    stageTimer.set(1.5);
    if (!isMuted) sound_button.play();
    state = "stage";
}

function isGameOver() {
    for (let i=0; i<columns; i++) {
        if (level[i].length > maxBlocks) {
            lostTimer.set(1);
            stageTimer.set(2);
            state = "lost";
        }
    }
}

function resetGame() {
    score = 0;
    powerUp = 0;
    stage = firstStage;
    hardBullets = 10;
    level = Array.from(Array(columns), () => []);
    blockFallTimer.unset();
    playStageTimer.unset();
    hideButtons(false)
}

function nextStage() {
    if (playStageTimer.elapsed()) {
        //level = Array.from(Array(columns), () => []);

        stage++;
        stageTimer.set(1);
        state = "clear";
    }
}

function clearStage() {
    for (let col=0; col<columns; col++){
        for (let row=0; row<level[col].length; row++) {
            level[col][row].destroy();
        }
    }

    if (stageTimer.elapsed()) {
        stageTimer.set(1.5);
        
        if (stage === lastStage) {
            state = "win";
        }
        else {
            if (!isMuted) stage_sound.play();
            state = "stage";
        }
    }
}

function showInfo() {
    drawTile(vec2(1,38.5),vec2(1.2),tile(2), extraColor);
    drawTextScreen("x " + hardBullets, vec2(100, 45), 40, playerColor, undefined, undefined, "left");
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

        if (levelData[stage].chanceOfHardBlock) {
            if (rand(0,1) > levelData[stage].chanceOfHardBlock)
                level[col].push(new Block(vec2(x, y), 1000, col, 2));            // spawn hard blocks
        } 

        level[col].push(new Block(vec2(x, y), pos, col, 1));               // spawn normal blocks

        spawnBlockTimer.set(rand(0.1, .8));
    }

    if (blockFallTimer.elapsed()) {
        const col = randInt(0, columns);
        const pos = level[col].length;
        const x = col * blockSize + blockSize / 2;
        const y = firstRow - pos * blockSize;

        new Block(vec2(x, y), 13, col, 3);                                  // spawn falling blocks
        blockFallTimer.set(randInt(0, levelData[stage].fallingTimer))
    }
}

function moveBlocks() {
    for (let col=0; col<columns; col++)
    for (let row=0; row<level[col].length; row++) {
        if (level[col][row].type < 3)
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
        const x = randInt(1, 20);
        new Diamond(vec2(x, 41));
        diamondTimer.set(2);
    }

    // diamond that gives you a strong bullet
    if (hardBulletTimer.elapsed()) {
        const x = randInt(1,20);
        new Diamond(vec2(x, 41), 1, "hard");
        hardBulletTimer.set(randInt(levelData[stage].hardBulletInterval.min, levelData[stage].hardBulletInterval.max));
    }
}

function swiped() {
    if (touchEnd.y > touchStart.y && touchEnd.y - touchStart.y > 3 && !swipeTimer.elapsed())
        return true;

    return false;
}

function hideButtons(hidden) {
    if (hidden) {
        playBtn.pos.x = -5;
        soundBtn.pos.x = -5;
    } else {
        playBtn.pos.x = cameraPos.x;
        soundBtn.pos.x = cameraPos.x;
    }
}

//function hidePlayer(hidden) {
//    if (hidden) {
//        player.pos = vec2(-5,-5);
//    }
//}

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

function tutorial() {
    const posX = mainCanvasSize.x/2;
    const posY = mainCanvasSize.y/2;
    const fontSize = 32;
    drawTile(vec2(cameraPos.x-1, cameraPos.y - 7.5), vec2(1.2), tile(2), extraColor);
    drawTextScreen("x " + hardBullets, vec2(posX, posY + 240), fontSize, playerColor, undefined, undefined, "left");
    
    let shootText = "PRESS SPACE";
    let hardBulletText = "PRESS LEFT CLICK";

    if (isTouchDevice) {
        shootText = "TOUCH THE SCREEN";
        hardBulletText = "SWIPE UP";
    }
    
    drawTextScreen(shootText, vec2(mainCanvasSize.x/2, mainCanvasSize.y/2 + 130), fontSize, playerColor);
    drawTextScreen(hardBulletText, vec2(mainCanvasSize.x/2, mainCanvasSize.y/2 + 185), fontSize, playerColor);
    
    // Credits
    drawTextScreen("2024. ISAAC BENITEZ.", vec2(mainCanvasSize.x/2, mainCanvasSize.y/2 + 585), 28, playerColor);
}

function drawLevel(l) {
    const currLevel = levelData[l];

    for (let col=0; col<columns; col++)
    for (let row=0; row<currLevel.level[col].length; row++) {
        const pos = level[col].length;
        const x = col * blockSize + blockSize / 2;
        const y = firstRow - pos * blockSize;

        const type = currLevel.level[col][row];
        if (type === 3)
            new Block(vec2(x, y), 13, col, type);
        else if (type === 2)
            level[col].push(new Block(vec2(x, y), 1000, col, type));
        else
            level[col].push(new Block(vec2(x, y), pos + 1, col, type));
    }
}

function fireControl() {
    if (keyWasPressed("Space"))
        fire();

    if (!fireTimer.isSet())
        fireTimer.set(.3);

    if (mouseWasPressed(0)) {
        touchStart = mousePos;
        touchEnd = touchStart;
        fireTimer.set(.1); // prevent double shoot when swipping
        swipeTimer.set(.2);
    }

    if (mouseWasReleased(0)) {
        touchEnd = mousePos;
    }

    if (swiped() || (!isTouchDevice && mouseWasPressed(0))) { // first condition, mobile; second condition, computer
            fire(true);
            touchEnd = 0;
            touchStart = 0;
    }

    if (fireTimer.elapsed() && mouseIsDown(0) && isTouchDevice) {
        fire();
        fireTimer.set(.2);
    }
}