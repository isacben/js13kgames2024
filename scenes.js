'use strict';

function splashScene() {
    drawTextScreen("Welcome", vec2(mainCanvasSize.x/2, mainCanvasSize.y/2), 50);
}

function playScene() {
    if (/*mouseWasPressed(0) || */keyWasPressed(32)) {
        fire();
    }

    if (!fireTimer.isSet()) {
        fireTimer.set(.3);
    }

    if (fireTimer.elapsed() && mouseIsDown(0)) {
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

    // game over condition
    for (let i=0; i<columns; i++) {
        if (level[i].length > 12) {
            lostTimer.set(0.1);
            state = "lost";
        }
    }
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

    if (engineObjects.length < 4) {
        resetGame();
        state = "splash";
    }
}