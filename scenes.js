'use strict';

function splashScreen() {
    drawTextScreen("Welcome", vec2(mainCanvasSize.x/2, mainCanvasSize.y/2), 50);
}

function play() {
    if (mouseWasPressed(0) || keyWasPressed(32)) {
        fire();
    }

    if (!spawnBlockTimer.isSet()){
        spawnBlockTimer.set(1);
    }
    spawnBlock();
    moveBlocks();

    // game over condition
    for (let i=0; i<8; i++) {
        if (level[i].length > 12) {
            lostTimer.set(0.1);
            state = "lost";
        }
    }
}

function lostScreen() {

    if (lostTimer.isSet()) {
        if (lostTimer.elapsed()) {
            let o = randInt(0, engineObjects.length);
            if (engineObjects[o].constructor.name === "Block") {
                engineObjects[o].destroy();
                lostTimer.set(0.1);
            }
        }
    }

    if (engineObjects.length === 1) {
        resetGame();
        state = "splash";
    }
}