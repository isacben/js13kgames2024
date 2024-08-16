'use strict';

function splashScreen() {
    drawTextScreen("Welcome", vec2(mainCanvasSize.x/2, mainCanvasSize.y/2), 50);
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