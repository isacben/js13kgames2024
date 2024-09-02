'use strict';

function titleScene() {
    //drawTextScreen("UNBLOCK", vec2(mainCanvasSize.x/2, mainCanvasSize.y/4), 50);

    if (!titleTimer.isSet()) {
            titleTimer.set(.5);
    }

    if (titleTimer.elapsed()) {
        const pos = randInt(0,7);
        titleLetter = "UNBLOCK".charAt(pos);
        titleTimer.set(rand(.7, 2));

        if (!isMuted) sound_letter.play(vec2(pos*4, 30));
    }
    printTitle();
    
    if (mouseWasPressed(0)) {
        new Click(mousePos);
    }
    
    soundIconBtn.pos = vec2(-5,1);
}

function playScene() {
    if (/*mouseWasPressed(0) || */keyWasPressed("Space")) {
        fire();
    }

    if (!fireTimer.isSet()) {
        fireTimer.set(.3);
    }


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
            //new Bullet(player.pos, vec2(0, 0.8), "hard");
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

    // game over condition
    for (let i=0; i<columns; i++) {
        if (level[i].length > 12) {
            lostTimer.set(0.1);
            state = "lost";
        }
    }

    if (mouseWasPressed(0))
        new Click(mousePos);

    soundIconBtn.pos = vec2(1,1);
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