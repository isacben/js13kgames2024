'use strict';

function titleScene() {
    fireControl();

    if (keyWasPressed("Enter")) {
        startGame();
    }
    
    if (mouseWasPressed(0)) {
        new Click(mousePos);
    }
    
    soundIconBtn.pos = vec2(-5,1);
}

function playScene() {
   fireControl(); 

    if (!playStageTimer.isSet())
        playStageTimer.set(levelData[stage].time);

    if (!spawnBlockTimer.isSet()){
        spawnBlockTimer.set(1);
    }

    spawnBlock();
    moveBlocks();

    if (!diamondTimer.isSet())
        diamondTimer.set(2);
    
    if (!hardBulletTimer.isSet())
        hardBulletTimer.set(randInt(10,20));

    spawnDiamond();

    if (mouseWasPressed(0))
        new Click(mousePos);

    soundIconBtn.pos = vec2(1,1);

    nextStage();
    isGameOver();
}

function endScene() {
    if (mouseWasPressed(0))
        new Click(mousePos);

    hideButtons(true);
    backBtn.pos.x = cameraPos.x;
}

function endSceneText(text, color) {
    drawTextScreen(text,vec2(mainCanvasSize.x/2, mainCanvasSize.y/4), 50, color);
    drawTextScreen(score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "), vec2(mainCanvasSize.x/2, mainCanvasSize.y/3), 40, playerColor);
}

function lostScene() {

    if (lostTimer.isSet()) {
        if (lostTimer.elapsed()) {
            let o = randInt(0, engineObjects.length);
            if (engineObjects[o].constructor.name === "Block") {
                engineObjects[o].destroy();
                lostTimer.set(0.1);
            }
        }
    }

    if (playStageTimer.isSet())
        playStageTimer.unset();

    if (engineObjects.length < 8) {
        state = "over";
    }
}

function showStage() {
    drawTextScreen("STAGE " + stage, vec2(mainCanvasSize.x/2, mainCanvasSize.y/5), 45, playerColor);
    
    if (stageTimer.elapsed()) {
        drawLevel(stage);
        playStageTimer.set(levelData[stage].time);
        state = "play";
    }
}

function showProgressBar() {
    drawRect(vec2(0 + 10*playStageTimer.getPercent(),37.3), vec2(20*playStageTimer.getPercent(), .5), bulletColor); // block color
}