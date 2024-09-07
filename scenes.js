'use strict';

function titleScene() {
    //drawTextScreen("UNBLOCK", vec2(mainCanvasSize.x/2, mainCanvasSize.y/4), 50);

    printTitle();
            
    if (keyWasPressed("Enter")) {
        startGame();
    }
    
    if (mouseWasPressed(0)) {
        new Click(mousePos);
    }
    
    soundIconBtn.pos = vec2(-5,1);
}

function playScene() {
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

    if (!spawnBlockTimer.isSet()){
        spawnBlockTimer.set(1);
    }

    spawnBlock();
    moveBlocks();

    if (!diamondTimer.isSet()) {
        diamondTimer.set(2);
    }
    
    spawnDiamond();

    if (!hardBulletTimer.isSet())
        hardBulletTimer.set(randInt(10,20));

    if (mouseWasPressed(0))
        new Click(mousePos);

    soundIconBtn.pos = vec2(1,1);

    nextStage();
    isGameOver();
}

function winScene() {
    if (mouseWasPressed(0))
        new Click(mousePos);

    hideButtons(true);
    drawTextScreen("WELL DONE!", vec2(mainCanvasSize.x/2, mainCanvasSize.y/4), 50, playerColor);
    
    drawTextScreen(score, vec2(mainCanvasSize.x/2, mainCanvasSize.y/3), 40, playerColor);
    backBtn.pos.x = cameraPos.x;
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

    if (engineObjects.length < 7) {
        resetGame();
        state = "title";
    }
}

function showStage() {
    drawTextScreen("STAGE " + stage, vec2(mainCanvasSize.x/2, mainCanvasSize.y/5), 45, playerColor);
    
    if (stageTimer.elapsed()) {
        drawLevel(stage);
        state = "play";
    }
}