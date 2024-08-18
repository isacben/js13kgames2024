'use strict';

function splashScreen() {
    drawTextScreen("Welcome", vec2(mainCanvasSize.x/2, mainCanvasSize.y/2), 50);
}

function play() {
    if (mouseWasPressed(0) || keyWasPressed(32)) {
        new Bullet(player.pos.x, player.pos.y, "hard");
    }

    if (!spawnBlockTimer.isSet()){
        spawnBlockTimer.set(1);
    }
    spawnBlock();

    for (let i=0; i<lines.length; i++) {
        if (lines[i] > 12) {
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